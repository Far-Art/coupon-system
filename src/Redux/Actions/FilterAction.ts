import { FilterType } from "../../Models/FilterType";

export interface FilterAction{
    type:FilterActionType;
    filterKey?: FilterType;
    filterValue?: any;
}

export enum FilterActionType{
    ADD = "ADD_FILTER",
    REMOVE = "REMOVE_FILTER",
    CLEAR = "CLEAR_FILTERS"
}

export function addFilter(filterType:FilterType, filter:any): FilterAction{
    return {type: FilterActionType.ADD, filterKey: filterType, filterValue:filter};
}

export function removeFilter(filterType:FilterType, filter:any): FilterAction{
    return {type: FilterActionType.REMOVE, filterKey: filterType, filterValue:filter};
}

export function clearFilters(): FilterAction{
    return {type: FilterActionType.CLEAR};
}