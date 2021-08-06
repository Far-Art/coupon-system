import { FilterTypes } from "../../Models/FilterTypes";

export interface FilterAction{
    type:FilterActionType;
    filterKey:FilterTypes;
    filterValue: any;
}

export enum FilterActionType{
    ADD = "ADD_FILTER",
    REMOVE = "REMOVE_FILTER"
}

export function addFilter(filterType:FilterTypes, filter:any): FilterAction{
    return {type: FilterActionType.ADD, filterKey: filterType, filterValue:filter};
}

export function removeFilter(filterType:FilterTypes, filter:any): FilterAction{
    return {type: FilterActionType.REMOVE, filterKey: filterType, filterValue:filter};
}