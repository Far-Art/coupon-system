import { CompanyModel } from "../../Models/CompanyModel";
import { CompaniesActionType, CompanyAction } from "../Actions/CompanyAction";
import { CompaniesAppState } from "../States/CompaniesAppState";

export function companyReducer(currentState:CompaniesAppState = new CompaniesAppState(), action:CompanyAction): CompaniesAppState {
    
    //TODO Check this FC for proper functionality

    const newState = {...currentState};

    switch(action.type){
        case CompaniesActionType.ADD:
            newState.appCompaniesList.push(action.payload);
            break;
        case CompaniesActionType.GET_SINGLE:
            newState.appCompaniesList = action.payload;
            break;
        case CompaniesActionType.FETCH_ALL:
            newState.appCompaniesList = action.payload;
            break;
        case CompaniesActionType.DELETE:
            newState.appCompaniesList = newState.appCompaniesList.filter(c => c.id !== action.payload);
            break;
        case CompaniesActionType.UPDATE:
            newState.appCompaniesList = updateCompany(newState.appCompaniesList, action.payload);
            break;
        default:
            return currentState;
    }
    return newState;
}

function updateCompany(companiesList:CompanyModel[], toUpdate:CompanyModel):CompanyModel[]{
    for(let i = 0; i < companiesList.length; i++){
        if(companiesList[i].id === toUpdate.id){
            companiesList[i] = {...toUpdate};
        }
    }
    return companiesList;
}