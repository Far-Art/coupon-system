import { CouponAction, CouponActionType } from "../Actions/CouponAction";
import { CouponsAppState } from "../States/CouponsAppState";

export function appCouponsReducer(currentState:CouponsAppState = new CouponsAppState(), action:CouponAction): CouponsAppState {

    const newState = {...currentState};

    switch(action.type){
        case CouponActionType.ADD:
            newState.appCouponsList.push(action.payload);
            break;
        case CouponActionType.GET_SINGLE:
            newState.appCouponsList = action.payload;
            break;
        case CouponActionType.FETCH_ALL:
            newState.appCouponsList = action.payload;
            break;
        case CouponActionType.DELETE:
            newState.appCouponsList = newState.appCouponsList.filter(c => c.id !== action.payload);
            break;
        default:
            return currentState;
    }
    return newState;
}