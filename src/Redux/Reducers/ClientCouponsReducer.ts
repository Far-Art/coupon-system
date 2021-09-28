import { ClientAction, ClientActionType } from "../Actions/ClientAction";
import { CouponAction, CouponActionType } from "../Actions/CouponAction";
import { RevertAction, RevertActionType } from "../Actions/RevertAction";
import { ClientCouponsAppState } from "../States/ClientCouponsAppState";

export function clientCouponsReducer(currentState: ClientCouponsAppState = new ClientCouponsAppState(), action: CouponAction | ClientAction | RevertAction): ClientCouponsAppState {

    const newState = { ...currentState };

    switch (action.type) {
        case CouponActionType.FETCH_BY_COMPANY:
            newState.clientCouponsList = action.payload;
            break;
        case CouponActionType.FETCH_BY_CUSTOMER:
            newState.clientCouponsList = action.payload;
            break;
        case CouponActionType.UPDATE_COUPON:
            const index = newState.clientCouponsList.findIndex(c => c.id === action.payload.id);
            if(index > -1){
                newState.clientCouponsList.splice(index, 1, action.payload);
            }
            break;
        case CouponActionType.DELETE_COUPON:
            newState.clientCouponsList = newState.clientCouponsList.filter(c => c.id !== action.payload);
            break;
        case ClientActionType.LOGOUT:
            newState.clientCouponsList = [];
            break;
        case CouponActionType.DISMISS_ALL_COUPONS:
            newState.clientCouponsList = [];
            break;
        case RevertActionType.REVERT_STATE:
            return currentState;
        default:
            return currentState;
    }
    return newState;
}