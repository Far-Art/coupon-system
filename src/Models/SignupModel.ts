import { UserTypes } from "./UserTypes";

export class SignupModel {
    public firstName:string = "";
    public lastName = "";
    public email:string = "";
    public password:string ="";
    public telephone?:string;
    public type:UserTypes = UserTypes.CUSTOMER; /* default value is customer */
}