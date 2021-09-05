import { ClientType } from "../../Models/ClientType";
import { LoginModel } from "../../Models/LoginModel";

export interface ClientAction{
    type:ClientActionType;
    clientType: ClientType | undefined;
    payload?:any;
}

export enum ClientActionType{
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT"
}

export function loginAction(login:LoginModel):ClientAction{
    return {type: ClientActionType.LOGIN, clientType:login.clientType, payload:login};
}

export function logoutAction():ClientAction{
    return {type: ClientActionType.LOGOUT, clientType:undefined};
}