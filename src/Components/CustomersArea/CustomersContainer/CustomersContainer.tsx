import { useEffect, useState } from "react";
import { CustomerModel } from "../../../Models/CustomerModel";
import { useAppSelector } from "../../../Redux/Hooks/hooks";
import { store } from "../../../Redux/Store/Store";
import FiltersContainer from "../../FiltersArea/FiltersContainer/FiltersContainer";
import EditableTableRow from "../../InputArea/EditableTableRow/EditableTableRow";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import emitActionToast from "../../SharedArea/Toasts/EmitActionToast";
import "./CustomersContainer.css";

interface CustomersContainerProps {
    customersList: CustomerModel[];
    ignoreFields?: string[];
}

export default function CustomersContainer(props: CustomersContainerProps): JSX.Element {

    // sets edit mode
    const [editCustomerWithId, setEditCustomerWithId] = useState<number>(0);

    // store filters subscribe
    const appfilters = useAppSelector(state => state.filterAppState);

    // customers state
    const [customers, setCustomers] = useState<CustomerModel[]>([]);

    useEffect(() => {
        if (props.customersList && props.customersList.length > 0) {
            setCustomers(filterCustomers(props.customersList));
        } else {
            setCustomers([]);
        }
    }, [props.customersList, appfilters]); // eslint-disable-line react-hooks/exhaustive-deps

    const filterCustomers =
        (customers: CustomerModel[]) => {
            let filteredList = customers;

            //filter by id
            if (appfilters.id >= 0) {
                filteredList = filteredList.filter(c => c.id === appfilters.id);
            }

            //filter by free text
            if (appfilters.freeText.length > 0) {
                filteredList = filteredList.filter((c) =>
                    c.name.toLowerCase().includes(appfilters.freeText) || c.lastName?.toLowerCase().includes(appfilters.freeText) || c.email.toLowerCase().includes(appfilters.freeText)
                );
            }
            return filteredList;
        } // eslint-disable-line react-hooks/exhaustive-deps

    function filteredMapFromObject(model: CustomerModel): Map<string, any> {
        const tempMapArray: Map<string, any> = new Map();
        if (model === undefined) {
            return tempMapArray;
        }
        mainLoop: for (const [key, value] of Object.entries(model)) {
            // ignore keys with object by default
            if ((typeof value === "object" && key.toLowerCase() !== "image") || value === undefined) {
                continue;
            }
            //check for ignored fields
            if (props.ignoreFields !== undefined && props.ignoreFields.length > 0) {
                for (const ignored of props.ignoreFields) {
                    if (key.toLowerCase() === ignored) {
                        continue mainLoop;
                    }
                }
            }
            tempMapArray.set(key, value);
        }
        return tempMapArray;
    }

    function renderEmptyView() {
        return (
            <EmptyView
                text={
                    store.getState().filterAppState.filtersActive
                        ? "No matching customers, try changing filters"
                        : "No customers left"
                }
            />
        );
    }

    const render = () => {
        let counter = 1;

        return (
            <>
                <div className="CustomersCounter">
                    <p>
                        {customers.length + " customer" +
                            (customers.length === 1 ? "" : "s") +
                            " displayed"}
                    </p>
                </div>
                <table className="Coupons__table">
                    <thead>
                        <EditableTableRow
                            key={counter++}
                            object={customers[0]}
                            ignoreFieldsFunction={filteredMapFromObject}
                            objectModel={"CustomerModel"}
                            isHeader={true}
                        />
                    </thead>
                    <tbody>
                        {customers.map(customer =>
                            customer.id === editCustomerWithId ?
                                // in edit mode
                                <EditableTableRow
                                    key={customer.id}
                                    object={customer}
                                    objectModel={"CustomerModel"}
                                    ignoreFieldsFunction={filteredMapFromObject}
                                    inEditMode={true}
                                    tdClassName="table__center_text"
                                    nonEditableFields={["id", "clientType"]}
                                    onSave={setEditCustomerWithId}
                                />
                                :
                                // display mode
                                <EditableTableRow
                                    key={customer.id}
                                    object={customer}
                                    objectModel={"CustomerModel"}
                                    ignoreFieldsFunction={filteredMapFromObject}
                                    onClick={() => emitActionToast({
                                        object: customer,
                                        model: "CustomerModel",
                                        editCallback: setEditCustomerWithId,
                                        editCallbackParam: customer.id,
                                        deleteCallback: setEditCustomerWithId,
                                        deleteCallbackParam: -1,
                                        isEditable: true
                                    })}
                                    tdClassName="table__center_text"
                                    nonEditableFields={["id"]}
                                    onSave={setEditCustomerWithId}
                                />
                        )}
                    </tbody>
                </table>
            </>
        );
    };

    return (
        <div className="CustomersContainer">
            {(props.customersList && props.customersList.length > 0) && <FiltersContainer
                clients={props.customersList} />}
            <div className="CustomersView">
                {customers.length > 0 ? render() : renderEmptyView()}
            </div>
        </div>
    );
}