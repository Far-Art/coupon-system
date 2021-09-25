import { CompanyModel } from "../../../Models/CompanyModel";
import "./CompanyCard.css";

interface CardProps {
    company: CompanyModel;
}

export default function CompanyCard(props: CardProps): JSX.Element {
    return <div className="CompanyCard">{props.company.name}</div>;
}