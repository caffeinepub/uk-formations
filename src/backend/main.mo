import Map "mo:core/Map";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Array "mo:core/Array";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import Stripe "stripe/stripe";
import OutCall "http-outcalls/outcall";



actor {
  // ---------- USER & ADMIN AUTH ----------
  let accessControlState = AccessControl.initState();

  include MixinAuthorization(accessControlState);

  // ---------- RECORD TYPES ----------
  module FormationOrder {
    public func compareById(a : FormationOrder, b : FormationOrder) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  public type FormationOrder = {
    id : Nat;
    customerName : Text;
    contactEmail : Text;
    companyName : Text;
    packageSelected : Text;
    directorDetails : Text;
    shareholderDetails : Text;
    registeredOfficeAddress : Text;
    sicCodes : [Text];
    contactDetails : Text;
    pscDetails : Text;
  };

  type FormationOrderInput = {
    customerName : Text;
    contactEmail : Text;
    companyName : Text;
    packageSelected : Text;
    directorDetails : Text;
    shareholderDetails : Text;
    registeredOfficeAddress : Text;
    sicCodes : [Text];
    contactDetails : Text;
    pscDetails : Text;
  };

  public type SubmissionResponse = {
    orderId : Nat;
    confirmationMessage : Text;
  };

  public type NameAvailabilityResult = {
    isAvailable : Bool;
    message : Text;
  };

  public type UserProfile = {
    name : Text;
  };

  // ---------- STATE VARIABLES ----------
  var nextOrderId = 0;
  let userProfiles = Map.empty<Principal, UserProfile>();
  let formationOrders = Map.empty<Nat, FormationOrder>();
  let takenCompanyNames = Map.empty<Text, Bool>();

  var stripeConfiguration : ?Stripe.StripeConfiguration = null;

  // ---------- USER PROFILE FUNCTIONS ----------
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // ---------- STRIPE-INTEGRATED FORMATION ORDER ----------
  public func isStripeConfigured() : async Bool {
    stripeConfiguration != null;
  };

  func getStripeConfiguration() : Stripe.StripeConfiguration {
    switch (stripeConfiguration) {
      case (null) { Runtime.trap("Stripe needs to be first configured") };
      case (?value) { value };
    };
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    stripeConfiguration := ?config;
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can create checkout sessions");
    };
    await Stripe.createCheckoutSession(getStripeConfiguration(), caller, items, successUrl, cancelUrl, transform);
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    await Stripe.getSessionStatus(getStripeConfiguration(), sessionId, transform);
  };

  public query ({ caller }) func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // ---------- ORDER MANAGEMENT ----------
  public shared ({ caller }) func submitFormationOrder(orderInput : FormationOrderInput) : async SubmissionResponse {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can submit formation orders");
    };

    let newOrder : FormationOrder = {
      id = nextOrderId;
      customerName = orderInput.customerName;
      contactEmail = orderInput.contactEmail;
      companyName = orderInput.companyName;
      packageSelected = orderInput.packageSelected;
      directorDetails = orderInput.directorDetails;
      shareholderDetails = orderInput.shareholderDetails;
      registeredOfficeAddress = orderInput.registeredOfficeAddress;
      sicCodes = orderInput.sicCodes;
      contactDetails = orderInput.contactDetails;
      pscDetails = orderInput.pscDetails;
    };

    formationOrders.add(nextOrderId, newOrder);
    takenCompanyNames.add(orderInput.companyName.trim(#char(' ')), true);

    let response : SubmissionResponse = {
      orderId = nextOrderId;
      confirmationMessage = "Order submitted successfully!";
    };
    nextOrderId += 1;
    response;
  };

  public query ({ caller }) func getAllOrders() : async [FormationOrder] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can access all orders");
    };
    formationOrders.values().toArray();
  };

  public query ({ caller }) func getOrderById(orderId : Nat) : async ?FormationOrder {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can access order details");
    };
    formationOrders.get(orderId);
  };

  // ---------- COMPANY NAME CHECK ----------
  public query ({ caller }) func checkNameAvailability(name : Text) : async NameAvailabilityResult {
    let normalizedName = name.trim(#char(' '));
    let isAvailable = not takenCompanyNames.values().any(
      func(_taken) { takenCompanyNames.containsKey(normalizedName) }
    );

    if (isAvailable) {
      {
        isAvailable = true;
        message = "The name '" # normalizedName # "' is available.";
      };
    } else {
      {
        isAvailable = false;
        message = "The name '" # normalizedName # "' is already taken. Please choose another.";
      };
    };
  };
};
