import { ClientType } from "./ClientType";

export class SignupModel {
    public name!: string;
    public lastName!: string;
    public email!: string;
    public password!: string ;
    public telephone?: string;
    public clientType!: ClientType;
}