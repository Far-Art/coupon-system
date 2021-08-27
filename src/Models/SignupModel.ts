import { UserTypes } from "./UserTypes";

export class SignupModel {
    public name:string = "";
    public lastName = "";
    public email:string = "";
    public password:string ="";
    public telephone?:string;
    public clientType:UserTypes = UserTypes.CUSTOMER; /* default value is customer */
}