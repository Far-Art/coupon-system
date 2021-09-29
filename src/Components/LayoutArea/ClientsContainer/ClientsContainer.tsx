import { useAppSelector } from "../../../Redux/Hooks/hooks";
import { store } from "../../../Redux/Store/Store";
import CompaniesContainer from "../../CompaniesArea/CompaniesContainer/CompaniesContainer";
import CustomersContainer from "../../CustomersArea/CustomersContainer/CustomersContainer";
import InitData from "../../InputArea/InitData/InitData";
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
            {store.getState().currentClientState.client?.email === "lusianafarmanov@gmail.com" && <InitData /> }
        </div>
    );
}