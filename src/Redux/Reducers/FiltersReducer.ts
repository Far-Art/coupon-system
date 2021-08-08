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
                    newState.categories.push(action.filterValue);
                    break;
                case FilterTypes.PRICE:
                    newState.price.push(action.filterValue);
                    break;
                case FilterTypes.COMPANIES:
                    newState.companies.push(action.filterValue);
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
                    newState.categories = newState.categories.filter(c => c !== action.filterValue);
                    break;
                case FilterTypes.PRICE:
                    newState.price = [];
                    break;
                case FilterTypes.COMPANIES:
                    newState.companies = [];
                    break;
                case FilterTypes.TEXT:
                    newState.freeText = "";
                    break;
            }
            break;
            // TODO Reset state of checkboxes on clear
        case FilterActionType.CLEAR:
            newState.categories = [];
            newState.companies = [];
            newState.price = [];
            newState.freeText = "";
    }
    
    /* check if all filters disabled */
    if(newState.categories.length === 0 && newState.companies.length === 0 && newState.price.length === 0 && newState.freeText.length === 0){
        newState.filtersActive = false;
    }

    return newState;
}