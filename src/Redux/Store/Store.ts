import { combineReducers, createStore } from "redux";
import { couponReducer } from "../Reducers/CouponReducer";

// const reducers = combineReducers({couponsState: couponReducer, companiesState: authReducer});
const reducers = combineReducers({couponsState: couponReducer});
const store = createStore(reducers, (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
(window as any).__REDUX_DEVTOOLS_EXTENSION__());

export default store;