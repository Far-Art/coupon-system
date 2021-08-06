import { useEffect } from "react";
import { CompanyModel } from "../../../Models/CompanyModel";
import store from "../../../Redux/Store/Store";
import CompanyCard from "../../CompaniesArea/CompanyCard/CompanyCard";
import "./CompaniesContainer.css";

// TODO No companies rendered

function CompaniesContainer(): JSX.Element {
    let companies:CompanyModel[] = [];

    
    useEffect(() => {
        store.subscribe(() => {
            companies = store.getState().companiesState.companies;
         })
    })
    
    return (
        <div className="CompaniesContainer">
            {companies.map(c => <CompanyCard company={c} key={c.id} />)}
        </div>
    );
}

export default CompaniesContainer;
