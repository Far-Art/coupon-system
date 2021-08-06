import { CouponModel } from "../../Models/CouponModel";
import { CouponAction, CouponActionType } from "../Actions/CouponAction";
import { CouponsAppState } from "../States/CouponsAppState";

export function couponReducer(currentState:CouponsAppState = new CouponsAppState(), action:CouponAction): CouponsAppState {
    
    //TODO Check this FC for proper functionality

    const newState = {...currentState};

    switch(action.type){
        case CouponActionType.ADD:
            newState.coupons.push(action.payload);
            break;
        case CouponActionType.GET_SINGLE:
            newState.coupons = action.payload;
            break;
        case CouponActionType.FETCH_ALL:
            newState.coupons = action.payload;
            break;
        case CouponActionType.DELETE:
            newState.coupons = newState.coupons.filter(c => c.id !== action.payload);
            break;
        case CouponActionType.UPDATE:
            newState.coupons = updateCoupon(newState.coupons, action.payload);
            break;
    }
    return newState;
}

function updateCoupon(couponsList:CouponModel[], toUpdate:CouponModel):CouponModel[]{
    for(let i = 0; i < couponsList.length; i++){
        if(couponsList[i].id === toUpdate.id){
            couponsList[i] = {...toUpdate};
        }
    }
    return couponsList;
}