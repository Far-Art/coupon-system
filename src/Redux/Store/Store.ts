import { combineReducers, createStore } from "redux";
import { companyReducer } from "../Reducers/CompanyReducer";
import { couponReducer } from "../Reducers/CouponReducer";
import { customerReducer } from "../Reducers/CustomerReducer";
import { FiltersReducer } from "../Reducers/FiltersReducer";

const reducers = combineReducers({couponsState: couponReducer, filterState:FiltersReducer, customersState:customerReducer, companiesState:companyReducer});

const store = createStore(reducers, (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
(window as any).__REDUX_DEVTOOLS_EXTENSION__());

export default store;