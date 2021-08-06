import { CustomerModel } from "../../../Models/CustomerModel";
import "./CustomerCard.css";

interface CardProps{
    customer:CustomerModel;
}

function CustomerCard(props:CardProps): JSX.Element { 
    return (
        <div className="CustomerCard">
			{props.customer.firstName}
            <br/>
            {props.customer.lastName}
        </div>
    );
}

export default CustomerCard;
