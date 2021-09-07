import { CouponModel } from "../../Models/CouponModel";

export interface CartAction{
    type:CartActionType;
    payload:CouponModel;
}

export enum CartActionType{
    ADD_TO_CART = "ADD_TO_CART",
    DELETE_FROM_CART = "DELETE_FROM_CART",
    CLEAR_CART = "CLEAR_CART"
}

export function addToCart(item:CouponModel):CartAction{
    return {type: CartActionType.ADD_TO_CART, payload:item};
}

export function deleteFromCart(item:CouponModel):CartAction{
    return {type: CartActionType.DELETE_FROM_CART, payload:item};
}

export function clearCart():CartAction{
    return {type: CartActionType.CLEAR_CART, payload:new CouponModel};
}