import { useAppSelector } from "../../../Redux/Hooks/hooks";
import CompaniesContainer from "../../CompaniesArea/CompaniesContainer/CompaniesContainer";
import CustomersContainer from "../../CustomersArea/CustomersContainer/CustomersContainer";
import "./ClientsContainer.css";

export default function ClientsContainer(): JSX.Element {

    const customers = useAppSelector(state =>
        state.customersAppState.appCustomersList
    );

    const companies = useAppSelector(state =>
        state.companiesAppState.appCompaniesList
    );

    return (
        <div className="ClientsContainer">
            <CustomersContainer customers={customers} />
            <CompaniesContainer />
        </div>
    );
}