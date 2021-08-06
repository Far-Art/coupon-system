import { FilterTypes } from "../../Models/FilterTypes";
import { FilterAction, FilterActionType } from "../Actions/FilterAction";
import { FiltersAppState } from "../States/FiltersAppState";

export function FiltersReducer(currentState:FiltersAppState = new FiltersAppState(), action:FilterAction):FiltersAppState{
    
    // TODO Check this FC for proper functionality
    // TODO SIMPLIFY Filters Functions after FilterAppState simplifications

    const newState = {...currentState};

    switch(action.type){
        /* Adding filter */
        case FilterActionType.ADD: 
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
    }
    return newState;
}