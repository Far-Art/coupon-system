import { CouponModel } from "../../Models/CouponModel";

export interface CouponAction {
    type: CouponActionType;
    payload?: any;
}

export enum CouponActionType {
    ADD = "ADD_COUPON",
    GET_SINGLE = "GET_SINGLE_COUPON",
    FETCH_ALL = "FETCH_ALL_COUPONS",
    FETCH_BY_COMPANY = "FETCH_BY_COMPANY",
    FETCH_BY_CUSTOMER = "FETCH_BY_CUSTOMER",
    DELETE_COUPON = "DELETE_COUPON",
    UPDATE_COUPON = "UPDATE_COUPON",
}

export function addCoupon(coupon: CouponModel): CouponAction {
    return { type: CouponActionType.ADD, payload: coupon };
}

export function getSingleCoupon(couponId: number): CouponAction {
    return { type: CouponActionType.GET_SINGLE, payload: couponId };
}

export function fetchAllCoupons(coupons: CouponModel[]): CouponAction {
    return { type: CouponActionType.FETCH_ALL, payload: coupons };
}

export function fetchCouponsByCompany(coupons: CouponModel[]): CouponAction {
    return { type: CouponActionType.FETCH_BY_COMPANY, payload: coupons };
}

export function fetchCouponsByCustomer(coupons: CouponModel[]): CouponAction {
    return { type: CouponActionType.FETCH_BY_CUSTOMER, payload: coupons };
}

export function deleteCoupon(couponId: number): CouponAction {
    return { type: CouponActionType.DELETE_COUPON, payload: couponId };
}

export function updateCoupon(coupon: CouponModel): CouponAction {
    return { type: CouponActionType.UPDATE_COUPON, payload: coupon };
}