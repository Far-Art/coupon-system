import { FilterAction, FilterActionType } from "../Actions/FilterAction";
import { FiltersAppState } from "../States/FiltersAppState";

export function FiltersReducer(currentState:FiltersAppState = new FiltersAppState(), action:FilterAction):FiltersAppState{
    
    // TODO Check this FC for proper functionality
    // TODO SIMPLIFY Filters Functions after FilterAppState simplifications

    const newState = {...currentState};

    let currentFilters:any[] | undefined = newState.activeFilters.get(action.filterKey);

    switch(action.type){
        case FilterActionType.ADD: 
            if(currentFilters === undefined){
                newState.activeFilters.set(action.filterKey, [action.filterValue]);
            } else {
                currentFilters.push(action.filterValue);
                newState.activeFilters.set(action.filterKey, currentFilters);
                console.log(newState);
            }
            break;
        case FilterActionType.REMOVE:
            // if(currentState.filters.has(action.filterType) && currentState.filters.get(action.filterType)?.includes(action.filter)){
            //     newState.filters.get(action.filterType)?.filter(function(value, index, arr){
            //         return value !== action.filter;
            //     })
            // }
            break;
    }
    return newState;
}