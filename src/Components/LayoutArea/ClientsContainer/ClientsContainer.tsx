import CompaniesContainer from "../../CompaniesArea/CompaniesContainer/CompaniesContainer";
import CustomersContainer from "../../CustomersArea/CustomersContainer/CustomersContainer";
import "./ClientsContainer.css";

function ClientsContainer(): JSX.Element {
    return (
        <div className="ClientsContainer">
			<CustomersContainer />
            <CompaniesContainer />
        </div>
    );
}

export default ClientsContainer;
