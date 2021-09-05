import { FilterTypes } from "../../Models/FilterTypes";
import { FilterAction, FilterActionType } from "../Actions/FilterAction";
import { FiltersAppState } from "../States/FiltersAppState";

export function FiltersReducer(currentState:FiltersAppState = new FiltersAppState(), action:FilterAction):FiltersAppState{

    const newState = {...currentState};

    switch(action.type){
        /* Adding filter */
        case FilterActionType.ADD: 
            newState.filtersActive = true;
            switch(action.filterKey){
                case FilterTypes.CATEGORIES:
                    newState.categoriesList.push(action.filterValue);
                    break;
                case FilterTypes.PRICE:
                    newState.priceList.push(action.filterValue);
                    break;
                case FilterTypes.COMPANIES:
                    newState.companiesList.push(action.filterValue);
                    break;
                case FilterTypes.TEXT:
                    newState.freeText = action.filterValue;
                    break;
            }
            break;

        /* Removing filter */
        case FilterActionType.REMOVE:
            switch(action.filterKey){
                case FilterTypes.CATEGORIES:
                    newState.categoriesList = newState.categoriesList.filter(c => c !== action.filterValue);
                    break;
                case FilterTypes.PRICE:
                    newState.priceList = [];
                    break;
                case FilterTypes.COMPANIES:
                    newState.companiesList = [];
                    break;
                case FilterTypes.TEXT:
                    newState.freeText = "";
                    break;
            }
            break;
            // TODO Reset state of checkboxes on clear
        case FilterActionType.CLEAR:
            newState.categoriesList = [];
            newState.companiesList = [];
            newState.priceList = [];
            newState.freeText = "";
            break;
        
        default:
            return currentState;
    }
    
    /* check if all filters disabled */
    if(newState.categoriesList.length === 0 && newState.companiesList.length === 0 && newState.priceList.length === 0 && newState.freeText.length === 0){
        newState.filtersActive = false;
    }

    return newState;
}