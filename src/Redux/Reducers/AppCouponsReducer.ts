import { CouponModel } from "../../Models/CouponModel";
import { CouponAction, CouponActionType } from "../Actions/CouponAction";
import { CouponsAppState } from "../States/CouponsAppState";

export function appCouponsReducer(currentState:CouponsAppState = new CouponsAppState(), action:CouponAction): CouponsAppState {

    const newState = {...currentState};
    console.log("AppCoupon reducer");
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
        case CouponActionType.UPDATE:
            newState.appCouponsList = updateCoupon(newState.appCouponsList, action.payload);
            break;
        default:
            return currentState;
    }
    return newState;
}

// TODO CHECK THIS FOR PROPER FUNCTIONING
function updateCoupon(couponsList:CouponModel[], toUpdate:CouponModel):CouponModel[]{
    for(let i = 0; i < couponsList.length; i++){
        if(couponsList[i].id === toUpdate.id){
            couponsList[i] = {...toUpdate};
        }
    }
    return couponsList;
}