import { ClientType } from "./ClientType";

export class LoginModel {
    public id!:number;
    public email!:string;
    public fullName!:string;
    public password!:string;
    public clientType!:ClientType;
}