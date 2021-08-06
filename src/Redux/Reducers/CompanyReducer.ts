import { CompanyModel } from "../../Models/CompanyModel";
import { CompaniesActionType, CompanyAction } from "../Actions/CompanyAction";
import { CompaniesAppState } from "../States/CompaniesAppState";

export function companyReducer(currentState:CompaniesAppState = new CompaniesAppState(), action:CompanyAction): CompaniesAppState {
    
    //TODO Check this FC for proper functionality

    const newState = {...currentState};

    switch(action.type){
        case CompaniesActionType.ADD:
            newState.companies.push(action.payload);
            break;
        case CompaniesActionType.GET_SINGLE:
            newState.companies = action.payload;
            break;
        case CompaniesActionType.FETCH_ALL:
            newState.companies = action.payload;
            break;
        case CompaniesActionType.DELETE:
            newState.companies = newState.companies.filter(c => c.id !== action.payload);
            break;
        case CompaniesActionType.UPDATE:
            newState.companies = updateCustomer(newState.companies, action.payload);
            break;
    }
    return newState;
}

function updateCustomer(companiesList:CompanyModel[], toUpdate:CompanyModel):CompanyModel[]{
    for(let i = 0; i < companiesList.length; i++){
        if(companiesList[i].id === toUpdate.id){
            companiesList[i] = {...toUpdate};
        }
    }
    return companiesList;
}