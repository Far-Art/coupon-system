import { CompanyModel } from "../../Models/CompanyModel";

export interface CompanyAction{
    type:CompaniesActionType;
    payload?:any;
}

export enum CompaniesActionType{
    ADD = "ADD_COMPANY",
    GET_SINGLE = "GET_SINGLE_COMPANY",
    FETCH_ALL = "FETCH_ALL_COMPANIES",
    DELETE = "DELETE_COMPANY",
    UPDATE = "UPDATE_COMPANY",
}

export function addCompany(company:CompanyModel):CompanyAction{
    return {type: CompaniesActionType.ADD, payload:company};
}

export function getSingleCompany(companyId:number):CompanyAction{
    return {type: CompaniesActionType.GET_SINGLE, payload:companyId};
}

export function fetchAllCompanies(companies:CompanyModel[]):CompanyAction{
    return {type: CompaniesActionType.FETCH_ALL, payload:companies};
}

export function deleteCompany(companyId:number):CompanyAction{
    return {type: CompaniesActionType.DELETE, payload:companyId};
}

export function updateCompany(company:CompanyModel):CompanyAction{
    return {type: CompaniesActionType.UPDATE, payload:company};
}