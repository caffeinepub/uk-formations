import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  module FormationOrder {
    public func compareById(a : FormationOrder, b : FormationOrder) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  type FormationOrder = {
    id : Nat;
    customerName : Text;
    contactEmail : Text;
    formationType : Text;
    businessName : Text;
    additionalDetails : Text;
  };

  type FormationOrderInput = {
    customerName : Text;
    contactEmail : Text;
    formationType : Text;
    businessName : Text;
    additionalDetails : Text;
  };

  type SubmissionResponse = {
    orderId : Nat;
    confirmationMessage : Text;
  };

  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let formationOrders = Map.empty<Nat, FormationOrder>();
  var nextOrderId = 0;

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
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
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func submitFormationOrder(orderInput : FormationOrderInput) : async SubmissionResponse {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit formation orders");
    };

    let newOrder : FormationOrder = {
      id = nextOrderId;
      customerName = orderInput.customerName;
      contactEmail = orderInput.contactEmail;
      formationType = orderInput.formationType;
      businessName = orderInput.businessName;
      additionalDetails = orderInput.additionalDetails;
    };

    formationOrders.add(nextOrderId, newOrder);
    let response : SubmissionResponse = {
      orderId = nextOrderId;
      confirmationMessage = "Order submitted successfully!";
    };
    nextOrderId += 1;
    response;
  };

  public query ({ caller }) func getAllOrders() : async [FormationOrder] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can access all orders");
    };
    formationOrders.values().toArray();
  };

  public query ({ caller }) func getOrderById(orderId : Nat) : async ?FormationOrder {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can access order details");
    };
    formationOrders.get(orderId);
  };
};
