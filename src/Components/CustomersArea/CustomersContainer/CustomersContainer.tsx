import { Component } from "react";
import { Unsubscribe } from "redux";
import { CustomerModel } from "../../../Models/CustomerModel";
import { FiltersAppState } from "../../../Redux/States/FiltersAppState";
import { store } from "../../../Redux/Store/Store";
import CustomerCard from "../CustomerCard/CustomerCard";
import "./CustomersContainer.css";

interface CustomersContainerState {
    customers: CustomerModel[];
    filters?: FiltersAppState;
}

export default class CustomersContainer extends Component<{}, CustomersContainerState> {

    private unsubscribe!: Unsubscribe;

    public constructor(props: {}) {
        super(props);
        this.state = {
            customers: []
        };
    }

    async componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState({ customers: store.getState().customersAppState.appCustomersList });
        });

    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    public render(): JSX.Element {
        return (
            <div className="CouponsContainer">
                {this.state.customers.map(c => <CustomerCard customer={c} key={c.id} />)}
            </div>
        );
    }
}