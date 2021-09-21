import { CompanyModel } from "../../../Models/CompanyModel";
import "./CompanyCard.css";

interface CardProps {
    company: CompanyModel;
}

function CompanyCard(props: CardProps): JSX.Element {
    return <div className="CompanyCard">{props.company.name}</div>;
}

export default CompanyCard;