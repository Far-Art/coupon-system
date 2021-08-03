import { CouponModel } from "../../Models/CouponModel";
import { CouponAction } from "./CouponAction";
import { CouponActionType } from "./CouponActionType";

export function addCoupon(coupon:CouponModel):CouponAction{
    return {type: CouponActionType.ADD, payload:coupon};
}

export function getSingleCoupon(couponId:number):CouponAction{
    return {type: CouponActionType.GET_SINGLE, payload:couponId};
}

export function fetchAllCoupons(coupons:CouponModel[]):CouponAction{
    return {type: CouponActionType.FETCH_ALL, payload:coupons};
}

export function deleteCoupon(couponId:number):CouponAction{
    return {type: CouponActionType.DELETE, payload:couponId};
}

export function updateCoupon(coupon:CouponModel):CouponAction{
    return {type: CouponActionType.UPDATE, payload:coupon};
}