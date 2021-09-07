import { CouponAction, CouponActionType } from "../Actions/CouponAction";
import { ClientCouponsAppState } from "../States/ClientCouponsAppState";

export function clientCouponsReducer(currentState:ClientCouponsAppState = new ClientCouponsAppState(), action:CouponAction): ClientCouponsAppState {

    const newState = {...currentState};

    switch (action.type) {
        case CouponActionType.FETCH_BY_COMPANY:
            newState.clientCouponsList = action.payload;
            break;
        case CouponActionType.FETCH_BY_CUSTOMER:
            newState.clientCouponsList = action.payload;
            break;
        default:
            return currentState;
    }
    newState.clientCouponsList = action.payload;

    return newState;
}