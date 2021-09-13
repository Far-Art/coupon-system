import { LoginResponseModel } from "../../Models/LoginResponseModel";
import { ClientAction, ClientActionType } from "../Actions/ClientAction";
import { CurrentClientAppState } from "../States/CurrentClientAppState";

export default function currentClientReducer(currentClientState:CurrentClientAppState = new CurrentClientAppState(), action:ClientAction): CurrentClientAppState {

    const newState = {...currentClientState};

    switch(action.type){
        case ClientActionType.LOGIN:
            newState.client = action.payload
            newState.token = (action.payload as LoginResponseModel).token;
            break;
        case ClientActionType.LOGOUT:
            newState.client = undefined;
            newState.token = undefined;
            break;
        case ClientActionType.REQUEST_INFO:
            newState.client = action.payload;
            newState.token = currentClientState.token;
            break;
        default:
            return currentClientState
    }
    return newState;
}