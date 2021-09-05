import { ClientAction, ClientActionType } from "../Actions/ClientAction";
import { CurrentClientAppState } from "../States/CurrentClientAppState";

export default function currentClientReducer(currentClientState:CurrentClientAppState = new CurrentClientAppState(), action:ClientAction): CurrentClientAppState {

    const newState = {...currentClientState};

    switch(action.type){
        case ClientActionType.LOGIN:
            newState.client = action.payload;
            break;
        case ClientActionType.LOGOUT:
            newState.client = undefined;
            break;
        default:
            return currentClientState
    }
    return newState;
}