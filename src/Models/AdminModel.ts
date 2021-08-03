import { UserTypes } from "./UserTypes";

export class AdminModel{
    id!:number;
    firstName:string = "";
    lastName:string = "";
    email:string = "";
    password:string = "";
    department?:string;
    levelOfAccess!:string;
    type:UserTypes = UserTypes.ADMIN;
}