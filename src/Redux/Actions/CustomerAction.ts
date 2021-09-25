import { CustomerModel } from "../../Models/CustomerModel";

export interface CustomerAction {
    type: CustomerActionType;
    payload?: any;
}

export enum CustomerActionType {
    ADD = "ADD_CUSTOMER",
    GET_SINGLE = "GET_SINGLE_CUSTOMER",
    FETCH_ALL = "FETCH_ALL_CUSTOMERS",
    DELETE = "DELETE_CUSTOMER",
    UPDATE = "UPDATE_CUSTOMER",
}

export function addCustomer(customer: CustomerModel): CustomerAction {
    return { type: CustomerActionType.ADD, payload: customer };
}

export function getSingleCustomer(customerId: number): CustomerAction {
    return { type: CustomerActionType.GET_SINGLE, payload: customerId };
}

export function fetchAllCustomers(customers: CustomerModel[]): CustomerAction {
    return { type: CustomerActionType.FETCH_ALL, payload: customers };
}

export function deleteCustomer(customerId: number): CustomerAction {
    return { type: CustomerActionType.DELETE, payload: customerId };
}

export function updateCustomer(customer: CustomerModel): CustomerAction {
    return { type: CustomerActionType.UPDATE, payload: customer };
}