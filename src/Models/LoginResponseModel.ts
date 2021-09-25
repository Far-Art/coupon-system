import { ClientType } from "./ClientType";

export class LoginResponseModel {
    id!: number;
    email!: string;
    name!: string;
    lastName!: string;
    token!: string;
    clientType!: ClientType;
    isActive!: boolean;
    idleDisconnectIntervalInMillis!: number;
}