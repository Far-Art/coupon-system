import { ClientType } from "./ClientType";

export class CustomerModel{
    id!: number;
    name!: string;
    lastName!: string;
    email!: string;
    clientType!: ClientType;
}