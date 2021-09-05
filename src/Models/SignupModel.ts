import { ClientType } from "./ClientType";

export class SignupModel {
    public name:string = "";
    public lastName = "";
    public email:string = "";
    public password:string ="";
    public telephone?:string;
    public clientType:ClientType = ClientType.CUSTOMER; /* default value is customer */
}