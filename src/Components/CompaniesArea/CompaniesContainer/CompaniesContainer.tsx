import { useEffect, useState } from "react";
import { CompanyModel } from "../../../Models/CompanyModel";
import { useAppSelector } from "../../../Redux/Hooks/hooks";
import { store } from "../../../Redux/Store/Store";
import FiltersContainer from "../../FiltersArea/FiltersContainer/FiltersContainer";
import EditableTableRow from "../../InputArea/EditableTableRow/EditableTableRow";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import emitActionToast from "../../SharedArea/Toasts/EmitActionToast";
import "./CompaniesContainer.css";

interface CompaniesContainerProps {
    companiesList: CompanyModel[];
    ignoreFields?: string[];
}

export default function CompaniesContainer(props: CompaniesContainerProps): JSX.Element {

    // sets edit mode
    const [editCompanyWithId, setEditCompanyWithId] = useState<number>(0);

    // store filters subscribe
    const appfilters = useAppSelector(state => state.filterAppState);

    // customers state
    const [companies, setCompanies] = useState<CompanyModel[]>([]);

    useEffect(() => {
        if (props.companiesList && props.companiesList.length > 0) {
            setCompanies(filterCustomers(props.companiesList));
        }
    }, [props.companiesList, appfilters]); // eslint-disable-line react-hooks/exhaustive-deps

    const filterCustomers =
        (companies: CompanyModel[]) => {
            let filteredList = companies;

            //filter by id
            if (appfilters.id >= 0) {
                filteredList = filteredList.filter(c => c.id === appfilters.id);
            }

            //filter by free text
            if (appfilters.freeText.length > 0) {
                filteredList = filteredList.filter((c) =>
                    c.name.toLowerCase().includes(appfilters.freeText) || c.name?.toLowerCase().includes(appfilters.freeText) || c.email.toLowerCase().includes(appfilters.freeText)
                );
            }
            return filteredList;
        } // eslint-disable-line react-hooks/exhaustive-deps

    function filteredMapFromObject(model: CompanyModel): Map<string, any> {
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
                        ? "No matching companies, try changing filters"
                        : "No companies left"
                }
            />
        );
    }

    const render = () => {
        let counter = 1;

        return (
            <>
                <div className="CompaniesCounter">
                    <p>
                        {companies.length + " compan" +
                            (companies.length === 1 ? "y" : "ies") +
                            " displayed"}
                    </p>
                </div>
                <table className="Coupons__table">
                    <thead>
                        <EditableTableRow
                            key={counter++}
                            object={companies[0]}
                            ignoreFieldsFunction={filteredMapFromObject}
                            objectModel={"CompanyModel"}
                            isHeader={true}
                        />
                    </thead>
                    <tbody>
                        {companies.map(company =>
                            company.id === editCompanyWithId ?
                                // in edit mode
                                <EditableTableRow
                                    key={company.id}
                                    object={company}
                                    objectModel={"CompanyModel"}
                                    inEditMode={true}
                                    tdClassName="table__center_text"
                                    nonEditableFields={["id", "clientType", "name"]}
                                    ignoreFieldsFunction={filteredMapFromObject}
                                    onSave={setEditCompanyWithId}
                                />
                                :
                                // display mode
                                <EditableTableRow
                                    key={company.id}
                                    object={company}
                                    objectModel={"CompanyModel"}
                                    ignoreFieldsFunction={filteredMapFromObject}
                                    onClick={() => emitActionToast({
                                        object: company,
                                        model: "CompanyModel",
                                        editCallback: setEditCompanyWithId,
                                        editCallbackParam: company.id,
                                        deleteCallback: setEditCompanyWithId,
                                        deleteCallbackParam: -1,
                                        isEditable: true
                                    })}
                                    tdClassName="table__center_text"
                                    nonEditableFields={["id", "clienttype"]}
                                    onSave={setEditCompanyWithId}
                                />
                        )}
                    </tbody>
                </table>
            </>
        );
    };

    return (
        <div className="CompaniesContainer">
            <FiltersContainer
                clients={props.companiesList} />
            <div className="CompaniesView">
                {companies.length > 0 ? render() : renderEmptyView()}
            </div>
        </div>
    );
}