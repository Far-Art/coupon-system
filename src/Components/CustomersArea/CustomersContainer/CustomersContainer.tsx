import { render } from "@testing-library/react";
import { Component } from "react";
import { Unsubscribe } from "redux";
import { CustomerModel } from "../../../Models/CustomerModel";
import { useAppSelector } from "../../../Redux/Hooks/hooks";
import { FiltersAppState } from "../../../Redux/States/FiltersAppState";
import { store } from "../../../Redux/Store/Store";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import CustomerCard from "../CustomerCard/CustomerCard";
import "./CustomersContainer.css";

interface CustomersContainerProps {
    customers: CustomerModel[];
}

export default function CustomersContainer(props: CustomersContainerProps): JSX.Element {

    const appfilters = useAppSelector(state => state.filterAppState);

    const render = () => {
        // if props are empty or undefined
        if (!props.customers || props.customers.length === 0) {
            return <EmptyView text={"No customers present"} />;
        }

        return (
            <>
                <div className="CustomersCounter">
                    <p>
                        {props.customers.length + " customer" +
                            (props.customers.length === 1 ? "" : "s") +
                            " displayed"}
                    </p>
                </div>
                <table>
                    <thead>
                        <tr>
                            {Object.keys(props.customers[0]).map(c => <th>{c}</th>) }
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
            </>
        );
    };

    return (
        <div className="CouponsContainer">
           {render()}
        </div>
    );
}