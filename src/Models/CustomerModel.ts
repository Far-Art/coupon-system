import { UserTypes } from "./UserTypes";

export class CustomerModel{
    id!:number;
    firstName:string = "";
    lastName:string = "";
    email:string = "";
    password:string = "";
    type:UserTypes = UserTypes.CUSTOMER;
}