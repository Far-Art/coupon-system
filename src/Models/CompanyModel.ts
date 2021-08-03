import { UserTypes } from "./UserTypes";

export class CompanyModel{
    id!:number;
    name:string = "";
    email:string = "";
    password:string = "";
    type:UserTypes = UserTypes.COMPANY;
}