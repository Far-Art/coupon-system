import { ClientAction, ClientActionType } from "../Actions/ClientAction";
import { ClientCouponsAppState } from "../States/ClientCouponsAppState";

export function clientCouponsReducer(currentState:ClientCouponsAppState = new ClientCouponsAppState(), action:ClientAction): ClientCouponsAppState {

    // TODO Check if this reducer needed
    const newState = {...currentState};
    switch (action.type) {
        case ClientActionType.LOGIN:
            
            break;
    
        default:
            break;
    }
    // newState.clientCouponsList = action.payload;
    console.log("ClientCoupons reducer");
    console.log(action.payload);
    return newState;
}