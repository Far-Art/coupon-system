import { ClientInfoModel } from "../../Models/ClientInfoModel";
import { ClientType } from "../../Models/ClientType";
import { LoginResponseModel } from "../../Models/LoginResponseModel";

export interface ClientAction{
    type:ClientActionType;
    clientType?: ClientType;
    payload?:any;
}

export enum ClientActionType{
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    REQUEST_INFO = "REQUEST_INFO"
}

export function loginAction(login:LoginResponseModel):ClientAction{
    return {type: ClientActionType.LOGIN, clientType: login.clientType, payload: login};
}

export function logoutAction():ClientAction{
    return {type: ClientActionType.LOGOUT, clientType:undefined};
}

export function requestInfo(info:ClientInfoModel):ClientAction{
    return {type: ClientActionType.REQUEST_INFO, clientType: info.clientType, payload: info};
}