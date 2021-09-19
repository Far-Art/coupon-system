import { AdminModel } from "../../Models/AdminModel";
import { CompanyModel } from "../../Models/CompanyModel";
import { CustomerModel } from "../../Models/CustomerModel";

export class CurrentClientAppState {
    client: CustomerModel | CompanyModel | AdminModel | undefined;
    token: string | undefined;
    loginTime: number | undefined;
    idlingTime: number | undefined;
}