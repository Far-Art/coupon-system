import { ClientType } from "./ClientType";

export class ClientInfoModel{
    id!: number;
    name!: string;
    lastName!: string;
    password!: string;
    email!: string;
    department?: string;
    levelOfAccess!: string;
    clientType!: ClientType;
    active!: boolean;
}