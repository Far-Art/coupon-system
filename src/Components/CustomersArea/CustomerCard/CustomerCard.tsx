import { CustomerModel } from "../../../Models/CustomerModel";
import "./CustomerCard.css";

interface CardProps {
    customer: CustomerModel;
}

export default function CustomerCard(props: CardProps): JSX.Element {
    return (
        <div className="CustomerCard">
            {props.customer.name}
            <br />
            {props.customer.lastName}
        </div>
    );
}