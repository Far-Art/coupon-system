import { ClientType } from "../../Models/ClientType";
import { LoginResponseModel } from "../../Models/LoginResponseModel";

export interface ClientAction{
    type:ClientActionType;
    clientType?: ClientType;
    payload?:any;
}

export enum ClientActionType{
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT"
}

export function loginAction(login:LoginResponseModel):ClientAction{
    return {type: ClientActionType.LOGIN, clientType: login.clientType, payload:login};
}

export function logoutAction():ClientAction{
    return {type: ClientActionType.LOGOUT, clientType:undefined};
}