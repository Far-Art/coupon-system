import { CategoriesAction, CategoriesActionType } from "../Actions/CategoriesAction";
import { CategoriesAppState } from "../States/CategoriesAppState";

export default function categoriesReducer(categoriesAppState:CategoriesAppState = new CategoriesAppState(), action:CategoriesAction): CategoriesAppState {

    const newState = {...categoriesAppState};

    switch(action.type){
        case CategoriesActionType.SYNC_CATEGORIES:
            newState.categories = action.payload;
            break;
        default:
            return categoriesAppState;
    }
    return newState;
}