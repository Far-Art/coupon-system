import "./EditableTableRow.css";
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Icon from '@material-ui/core/Icon';
import { MouseEventHandler, useEffect, useState } from "react";
import { CouponModel } from "../../../Models/CouponModel";
import { store } from "../../../Redux/Store/Store";
import { toast } from "react-toastify";
import GlobalDataStreamer from "../../../Services/GlobalDataStreamer";
import React from "react";
import AppCurrencySymbol from "../../../Services/Currency";
import { CustomerModel } from "../../../Models/CustomerModel";
import { CompanyModel } from "../../../Models/CompanyModel";
import { ClientType } from "../../../Models/ClientType";

interface EditableTableRowProps {
    objectModel: "CouponModel" | "CustomerModel" | "CompanyModel";
    object: CouponModel | CustomerModel | CompanyModel;
    ignoreFieldsFunction?: Function;
    nonEditableFields?: string[];
    className?: string;
    tdClassName?: string;
    id?: any;
    inEditMode?: boolean;
    isHeader?: boolean;
    onClick?: MouseEventHandler<HTMLTableRowElement>;
    onSave?: React.Dispatch<React.SetStateAction<any>>;
    preventToast?: boolean;
}

export default function EditableTableRow(props: EditableTableRowProps): JSX.Element {

    const [newObject, setNewObject] = useState<CustomerModel | CouponModel | CompanyModel>({ ...props.object });

    useEffect(() => {
        props.inEditMode && emitToast();
        toast.update("TableEditToast", {
            render: toastComponent(newObject)
        });
    }, [props.inEditMode, newObject]); // eslint-disable-line react-hooks/exhaustive-deps

    const toastComponent = (object: any) => {
        return (
            <div>
                <span>Save / Cancel changes? </span>
                <button
                    onClick={() => {
                        switch (props.objectModel) {
                            case "CouponModel":
                                GlobalDataStreamer.updateCoupon(object).then((result) => {
                                    if (result) {
                                        props.onSave && props.onSave(0);
                                    }
                                });
                                break;
                            case "CustomerModel":
                                GlobalDataStreamer.updateCustomer(object).then((result) => {
                                    if (result) {
                                        props.onSave && props.onSave(0);
                                    }
                                });
                                break;
                            case "CompanyModel":
                                GlobalDataStreamer.updateCompany(object).then((result) => {
                                    if (result) {
                                        props.onSave && props.onSave(0);
                                    }
                                });
                                break;
                        }
                    }}
                    className="Toast__button" ><Icon component={CheckIcon} />
                </button>
                <button
                    className="Toast__button"
                    onClick={() => {
                        if (props.onSave) {
                            setNewObject(props.object);
                            props.onSave(0); // cancel editing
                        }
                    }}>
                    <Icon component={CloseIcon} />
                </button>
            </div>
        )
    }

    function emitToast() {
        toast.warning(
            toastComponent, {
            toastId: "TableEditToast",
            theme: "colored",
            position: "top-center",
            autoClose: false
        });
    }

    const setNewObjectValue = (key: any, value: any) => {
        const map: Map<any, any> = new Map(Object.entries(newObject));
        map.set(key, value);
        setNewObject(Object.fromEntries(map));
    }

    /* if amount or price is zero or end date is near, set warn class
   ----------------------------------------------------------------------- */
    function setWarningClass(key: string, value: any) {
        const timeNowInMillis = Date.parse(new Date().toLocaleDateString());
        if (value === 0) {
            return " Warn";
        } else if (key.toLowerCase().includes("enddate")) {
            if (Date.parse(new Date(value).toLocaleDateString()) < timeNowInMillis) {
                return " Warn";
            }
        }
        return "";
    }

    /*  set cell width
    ****************************************************************************************************/
    function setCellWidth(value: string) {
        const length = value.toLowerCase().replaceAll(" ", "").length;
        if (length <= 2) {
            return { width: "20%" }
        } else if (length <= 10) {
            return { width: "30%" }
        } else if (length <= 20) {
            return { width: "50%" }
        } else {
            return { width: "50%" }
        }
    }

    /*  return proper input field depending on type
    ****************************************************************************************************/
    function inputByValueType(key: string, value: any) {
        if (key.toLowerCase().includes("date")) {
            return <input
                type="date"
                defaultValue={`${value}`}
                onBlur={(event) => {
                    setNewObjectValue(key, event.target.value);
                }}
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        (event.target as HTMLInputElement).blur();
                    }
                }} />
        } else if (key.includes("price")) {
            return <input
                step="any"
                type="number"
                defaultValue={`${value}`}
                onBlur={(event) => {
                    setNewObjectValue(key, event.target.value);
                }}
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        (event.target as HTMLInputElement).blur();
                    }
                }} />
        } else if (key.includes("amount")) {
            return <input
                step="1"
                type="number"
                defaultValue={`${value}`}
                onBlur={(event) => {
                    setNewObjectValue(key, event.target.value);
                }}
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        (event.target as HTMLInputElement).blur();
                    }
                }} />
        } else if (key.includes("category")) {
            return (
                <select
                    onBlur={(event) => {
                        setNewObjectValue(key, event.target.value);
                    }}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            (event.target as HTMLInputElement).blur();
                        }
                    }}
                    defaultValue={value} >
                    {store.getState().categoriesAppState.categories.map(category =>
                        <option
                            key={category}
                            value={category}>
                            {category}
                        </option>)}
                </select>
            )
        } else if (key.toLowerCase().includes("clienttype")) {
            const clientTypes: string[] = Object.keys(ClientType).filter(key => typeof key === "string");
            return (
                <select
                    onBlur={(event) => {
                        setNewObjectValue(key, event.target.value);
                    }}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            (event.target as HTMLInputElement).blur();
                        }
                    }}
                    defaultValue={value} >
                    {clientTypes.map(clientType =>
                        <option
                            key={clientType}
                            value={clientType}>
                            {clientType}
                        </option>)}
                </select>
            )
        } else if (key.toLowerCase().includes("active")) {
            return (
                <select
                    onBlur={(event) => {
                        setNewObjectValue(key, event.target.value);
                    }}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            (event.target as HTMLInputElement).blur();
                        }
                    }}
                    defaultValue={value} >
                    <option
                        key={"false"}
                        value={"false"}>
                        {"False"}
                    </option>
                    <option
                        key={"true"}
                        value={"true"}>
                        {"True"}
                    </option>
                </select>

            )
        }
        return <input
            type="text"
            defaultValue={`${value}`}
            onBlur={(event) => {
                setNewObjectValue(key, event.target.value);
            }}
            onKeyDown={(event) => {
                if (event.key === "Enter") {
                    (event.target as HTMLInputElement).blur();
                }
            }} />
    }

    /*  checks if value allowed to be edited
    ****************************************************************************************************/
    function editableValueValidation(value: string) {
        if (props.nonEditableFields !== undefined && props.nonEditableFields.includes(value)) {
            return false;
        }
        return true;
    }

    /*  render logic
    ****************************************************************************************************/
    function render() {
        let counter = 1;
        const keyValueArrays = props.ignoreFieldsFunction !== undefined ? Array.from((props.ignoreFieldsFunction(props.object) as Map<string, any>).entries()) : Array.from(Object.entries(props.object));
        // check if data represent a header
        if (props.isHeader) {
            // const keyValueArrays = props.ignoreFieldsFunction !== undefined ?  Array.from((props.ignoreFieldsFunction(props.object) as Map<string, any>).entries()) : Array.from(Object.entries(props.object));
            return (
                keyValueArrays.map(([key, value]) => <th
                    style={setCellWidth(`${value}`)}
                    key={props.object.id + counter++}
                    className="EditableTH"
                >{key}</th>)
            );
        }

        // if in edit mode
        else if (props.inEditMode) {
            // const keyValueArrays = props.ignoreFieldsFunction !== undefined ?  Array.from((props.ignoreFieldsFunction(props.object) as Map<string, any>).entries()) : Array.from(Object.entries(props.object));
            return (
                keyValueArrays.map(([key, value]) => {
                    // editable fields case
                    if (editableValueValidation(key)) {
                        return (
                            <td
                                className={"EditableTD " + props.tdClassName}
                                style={setCellWidth(`${value}`)}
                                key={props.object.id + counter++}>
                                {inputByValueType(key, value)}
                            </td>
                        )
                    }
                    // non editable fields case
                    return (
                        <td
                            className={"EditableTD " + props.tdClassName}
                            style={setCellWidth(`${value}`)}
                            key={props.object.id + counter++}>
                            {`${value}` + (key.includes("price") ? AppCurrencySymbol : "")}
                        </td>
                    )
                })
            );
        }

        // other cases
        return (
            keyValueArrays.map(([key, value]) => {
                if (key.toLowerCase().includes("image")) {
                    return (
                        <td
                            className={"EditableTD " + props.tdClassName}
                            key={props.object.id + counter++}>
                            {<img className="EditableTDImage" src={value} alt="coupon" />}
                        </td>
                    );
                }

                return (
                    <td
                        className={"EditableTD " + props.tdClassName + setWarningClass(key, value)}
                        key={props.object.id + counter++}>
                        {`${value}` + (key.includes("price") ? AppCurrencySymbol : "")}
                    </td>
                );
            })
        );
    }

    return (
        <tr
            onClick={props.inEditMode ? () => emitToast() : props.onClick}
            id={props.id}
            onKeyDown={(event) => {
                if (event.key === "Escape") {
                    if (props.onSave) {
                        setNewObject(props.object);
                        props.onSave(0); // cancel editing
                    }
                }
            }}
            className={(props.className ? props.className : "") + (props.inEditMode ? " TrInEdit " : " ") + ("")}>
            {render()}
        </tr>
    )
}