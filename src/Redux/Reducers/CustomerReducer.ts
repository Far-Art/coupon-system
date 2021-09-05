import { CustomerModel } from "../../Models/CustomerModel";
import { CustomerAction, CustomerActionType } from "../Actions/CustomerAction";
import { CustomersAppState } from "../States/CustomersAppState";

export function customerReducer(currentState:CustomersAppState = new CustomersAppState(), action:CustomerAction): CustomersAppState {
    
    //TODO Check this FC for proper functionality

    const newState = {...currentState};

    switch(action.type){
        case CustomerActionType.ADD:
            newState.appCustomersList.push(action.payload);
            break;
        case CustomerActionType.GET_SINGLE:
            newState.appCustomersList = action.payload;
            break;
        case CustomerActionType.FETCH_ALL:
            newState.appCustomersList = action.payload;
            break;
        case CustomerActionType.DELETE:
            newState.appCustomersList = newState.appCustomersList.filter(c => c.id !== action.payload);
            break;
        case CustomerActionType.UPDATE:
            newState.appCustomersList = updateCustomer(newState.appCustomersList, action.payload);
            break;
        default:
            return currentState;
    }
    return newState;
}

function updateCustomer(customersList:CustomerModel[], toUpdate:CustomerModel):CustomerModel[]{
    for(let i = 0; i < customersList.length; i++){
        if(customersList[i].id === toUpdate.id){
            customersList[i] = {...toUpdate};
        }
    }
    return customersList;
}