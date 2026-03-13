import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import Text "mo:core/Text";

module {
  public type OldFormationOrder = {
    id : Nat;
    customerName : Text;
    contactEmail : Text;
    formationType : Text;
    businessName : Text;
    additionalDetails : Text;
  };

  public type NewFormationOrder = {
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

  public type OldActor = {
    formationOrders : Map.Map<Nat, OldFormationOrder>;
    nextOrderId : Nat;
  };

  public type NewActor = {
    formationOrders : Map.Map<Nat, NewFormationOrder>;
    takenCompanyNames : Map.Map<Text, Bool>;
    nextOrderId : Nat;
  };

  public func run(old : OldActor) : NewActor {
    let newOrders = old.formationOrders.map<Nat, OldFormationOrder, NewFormationOrder>(
      func(_k, oldOrder) {
        {
          id = oldOrder.id;
          customerName = oldOrder.customerName;
          contactEmail = oldOrder.contactEmail;
          companyName = oldOrder.businessName;
          packageSelected = "N/A";
          directorDetails = "N/A";
          shareholderDetails = "N/A";
          registeredOfficeAddress = "N/A";
          sicCodes = [];
          contactDetails = "N/A";
          pscDetails = "N/A";
        };
      }
    );

    {
      formationOrders = newOrders;
      takenCompanyNames = Map.empty<Text, Bool>();
      nextOrderId = old.nextOrderId;
    };
  };
};
