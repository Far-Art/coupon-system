import { UserTypes } from "./UserTypes";

export class CustomerModel{
    id!:number;
    firstName:string = "";
    lastName:string = "";
    email:string = "";
    type:UserTypes = UserTypes.CUSTOMER;
}