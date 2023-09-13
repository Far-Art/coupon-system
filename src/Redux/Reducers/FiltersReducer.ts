import { FilterType } from "../../Models/FilterType";
import { FilterAction, FilterActionType } from "../Actions/FilterAction";
import { FiltersAppState } from "../States/FiltersAppState";

export function FiltersReducer(currentState: FiltersAppState = new FiltersAppState(), action: FilterAction): FiltersAppState {

    const newState = { ...currentState };

    switch (action.type) {
        /* Adding filter */
        case FilterActionType.ADD:
            newState.filtersActive = true;
            switch (action.filterKey) {
                case FilterType.CATEGORIES:
                    newState.categoriesList.push(action.filterValue);
                    break;
                case FilterType.PRICE:
                    newState.priceList = action.filterValue;
                    break;
                case FilterType.COMPANIES:
                    newState.companiesList.push(action.filterValue);
                    break;
                case FilterType.TEXT:
                    newState.freeText = action.filterValue;
                    break;
                case FilterType.ID:
                    newState.id = +action.filterValue;
                    break;
            }
            break;

        /* Removing filter */
        case FilterActionType.REMOVE:
            switch (action.filterKey) {
                case FilterType.CATEGORIES:
                    newState.categoriesList = newState.categoriesList.filter(c => c !== action.filterValue);
                    break;
                case FilterType.PRICE:
                    newState.priceList = 0;
                    break;
                case FilterType.COMPANIES:
                    newState.companiesList = newState.companiesList.filter(c => c !== action.filterValue);
                    break;
                case FilterType.TEXT:
                    newState.freeText = "";
                    break;
            }
            break;
        case FilterActionType.CLEAR:
            newState.id = -99;
            newState.categoriesList = [];
            newState.companiesList = [];
            newState.priceList = -99;
            newState.freeText = "";
            break;
        default:
            return currentState;
    }

    /* check if all filters disabled */
    if (newState.id < 0 && newState.categoriesList.length === 0 && newState.companiesList.length === 0 && newState.priceList < 0 && newState.freeText.length === 0) {
        newState.filtersActive = false;
    }

    return newState;
}