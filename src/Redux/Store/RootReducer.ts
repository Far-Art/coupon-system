import { combineReducers } from "redux";
import { appCouponsReducer } from "../Reducers/AppCouponsReducer";
import cartReducer from "../Reducers/CartReducer";
import { clientCouponsReducer } from "../Reducers/ClientCouponsReducer";
import { companyReducer } from "../Reducers/CompanyReducer";
import currentClientReducer from "../Reducers/CurrentClientReducer";
import { customerReducer } from "../Reducers/CustomerReducer";
import { FiltersReducer } from "../Reducers/FiltersReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import categoriesReducer from "../Reducers/CategoriesReducer";
import colorPaletteReducer from "../Reducers/ColorPaletteReducer";

const rootReducer = combineReducers({
    currentClientState: currentClientReducer,
    couponsAppState: appCouponsReducer,
    clientCouponsState: clientCouponsReducer,
    filterAppState: FiltersReducer,
    customersAppState: customerReducer,
    companiesAppState: companyReducer,
    cartAppState: cartReducer,
    categoriesAppState: categoriesReducer,
    colorPaletteState: colorPaletteReducer
});

const persistConfig = {
    key: "root",
    storage: storage,
    blacklist: [
        "couponsAppState",
        "customersAppState",
        "companiesAppState",
        "clientCouponsState",
        "filterAppState"
    ]
}

export default persistReducer(persistConfig, rootReducer);