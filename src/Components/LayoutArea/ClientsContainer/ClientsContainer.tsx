import { useAppSelector } from "../../../Redux/Hooks/hooks";
import CompaniesContainer from "../../CompaniesArea/CompaniesContainer/CompaniesContainer";
import CustomersContainer from "../../CustomersArea/CustomersContainer/CustomersContainer";
import "./ClientsContainer.css";

export default function ClientsContainer(): JSX.Element {

    const allCustomers = useAppSelector(state =>
        state.customersAppState.appCustomersList
    );

    const allCompanies = useAppSelector(state =>
        state.companiesAppState.appCompaniesList
    );

    return (
        <div className="ClientsContainer">
            <CustomersContainer customersList={allCustomers} ignoreFields={["name"]} />
            <CompaniesContainer companiesList={allCompanies} ignoreFields={["lastname"]} />
        </div>
    );
}