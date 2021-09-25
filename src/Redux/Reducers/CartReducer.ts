import { CartAction, CartActionType } from "../Actions/CartAction";
import { CartAppState } from "../States/CartAppState";

export default function cartReducer(cartState: CartAppState = new CartAppState(), action: CartAction): CartAppState {

    const newState = { ...cartState };

    switch (action.type) {
        case CartActionType.ADD_TO_CART:
            // newState.forPurchaseCouponsList.push(action.payload);
            break;
        case CartActionType.DELETE_FROM_CART:
            newState.forPurchaseCouponsList = newState.forPurchaseCouponsList.filter(c => c !== action.payload);
            break;
        case CartActionType.DELETE_BATCH_FROM_CART:
            newState.forPurchaseCouponsList = newState.forPurchaseCouponsList.filter(c => (!(action.payload as number[]).includes(c.id)));
            break;
        case CartActionType.CLEAR_CART:
            newState.forPurchaseCouponsList = [];
            break;
        default:
            return cartState;
    }
    return newState;
}