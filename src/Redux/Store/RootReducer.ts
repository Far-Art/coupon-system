import { combineReducers } from "redux";
import { appCouponsReducer } from "../Reducers/AppCouponsReducer";
import cartReducer from "../Reducers/CartReducer";
import { clientCouponsReducer } from "../Reducers/ClientCouponsReducer";
import { companyReducer } from "../Reducers/CompanyReducer";
import currentClientReducer from "../Reducers/CurrentClientReducer";
import { customerReducer } from "../Reducers/CustomerReducer";
import { FiltersReducer } from "../Reducers/FiltersReducer";
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";
import categoriesReducer from "../Reducers/CategoriesReducer";

const rootReducer = combineReducers({
    currentClientState : currentClientReducer, 
    couponsAppState : appCouponsReducer,
    clientCouponsState : clientCouponsReducer, 
    filterAppState : FiltersReducer, 
    customersAppState : customerReducer, 
    companiesAppState : companyReducer,
    cartAppState : cartReducer,
    categoriesAppState : categoriesReducer
});

const persistConfig = {
    key: "root",
    storage: storage,
    blacklist:["couponsAppState", 
        "customersAppState", 
        "companiesAppState", 
        "clientCouponsState"]
}

export default persistReducer(persistConfig, rootReducer);