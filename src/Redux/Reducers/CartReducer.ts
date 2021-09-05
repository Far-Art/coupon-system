import { CartAction, CartActionType } from "../Actions/CartAction";
import { CartAppState } from "../States/CartAppState";

export default function cartReducer(cartState:CartAppState = new CartAppState(), action:CartAction): CartAppState {

    const newState = {...cartState};

    switch(action.type){
        case CartActionType.ADD_TO_CART:
            newState.forPurchaseCouponsList.push(action.payload);
            break;
        case CartActionType.DELETE_FROM_CART:
            newState.forPurchaseCouponsList = newState.forPurchaseCouponsList.filter(c => c !== action.payload);
            break;
        default:
            return cartState;
    }
    return newState;
}