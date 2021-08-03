import { CouponActionType } from "./CouponActionType";

export interface CouponAction{
    type:CouponActionType;
    payload?:any;
}