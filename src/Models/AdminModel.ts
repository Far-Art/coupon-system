import { ClientType } from "./ClientType";

export class AdminModel{
    id!:number;
    name!:string ;
    lastName!:string ;
    email!:string;
    department?:string;
    levelOfAccess!:string;
    clientType:ClientType = ClientType.ADMIN;
}