import { ClientType } from "./ClientType";

export class CompanyModel{
    id!:number;
    name!:string;
    email!:string;
    clientType:ClientType = ClientType.COMPANY;
    active!: boolean;
}