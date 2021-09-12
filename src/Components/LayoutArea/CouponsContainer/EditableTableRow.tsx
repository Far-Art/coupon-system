import "./EditableTableRow.css";
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Icon from '@material-ui/core/Icon';
import { MouseEventHandler, useEffect, useState } from "react";
import { CouponModel } from "../../../Models/CouponModel";
import { store } from "../../../Redux/Store/Store";
import ApiGlobalLogic from "../../../Services/ApiGlobalLogic";
import { toast } from "react-toastify";
import GlobalDataStreamer from "../../../Services/GlobalDataStreamer";
import React from "react";

interface EditableTableRowProps{
    coupon:CouponModel;
    ignoreFields?: string[];
    nonEditableFields?: string[];
    className?: string;
    tdClassName?: string;
    id?: any;
    editable?: boolean;
    onClick?: MouseEventHandler<HTMLTableRowElement> | undefined;
    onSave?: React.Dispatch<React.SetStateAction<any>>;
}

export default function EditableTableRow(props: EditableTableRowProps): JSX.Element{

    const [newObject, setNewObject] = useState<CouponModel>({...props.coupon});

    const [categories] = useState<string[]>(store.getState().categoriesAppState.categories);


    const setNewObjectValue = (key:any, value:any) => {
        const map:Map<any, any> = new Map(Object.entries(newObject));
        map.set(key, value);
        setNewObject(Object.fromEntries(map));
    }

    const toastComponent = (object:any) => {
        return(
            <div>
            <span>Save / Cancel changes? </span>
            <button 
                onClick={() => {
                    if(props.onSave){
                        GlobalDataStreamer.updateCoupon(object).then((result) => {
                            if(!result){
                                setNewObject(props.coupon);
                            }
                        });
                        props.onSave(0); // cancel editing
                    }
                }} 
                className="Toast__button" ><Icon component={CheckIcon} /></button>
            <button 
                className="Toast__button" 
                onClick={() => {
                    if(props.onSave){
                        setNewObject(props.coupon);
                        props.onSave(0); // cancel editing
                    }
                }}
                ><Icon component={CloseIcon} /></button>
        </div>
        )
    }

    useEffect(() => {
        {(props.editable === undefined ? true : props.editable) && emitToast()}
        toast.update("TableEditToast", {
            render: toastComponent(newObject)
        });
    },[newObject]);

    function emitToast(){
        toast.warning(
            toastComponent,
            {
                toastId: "TableEditToast",
                theme:"colored",
                position:"top-center",
                autoClose: false
            });
    }

    function render() {
            return Object.entries(newObject).map(([key, value]) => {

                // check for ignored fields
                if(props.ignoreFields){
                    for(const ignored of props.ignoreFields){
                        if(key.toLowerCase() === ignored){
                           return;
                        }
                    }
                }

                // check for non editable fields
                if(props.nonEditableFields){
                    for(const nonEditable of props.nonEditableFields){
                        if(key.toLowerCase().includes(nonEditable)){
                            return (
                                <td key={key} className={ props.tdClassName}>
                                    {value}
                                </td>
                            );
                        }
                    }
                } else if (props.editable === false){
                    return (
                        <td key={key} className={props.tdClassName}>
                            {value}
                        </td>
                    );
                }

                // set pattern and type for input
                let type = "text";
                let pattern:any = "";

                if (key.toLowerCase().includes("amount")){
                    type = "number";
                    pattern = ApiGlobalLogic.patterns.string.integers;
                } 
                // test for email
                else if (ApiGlobalLogic.patterns.regex.email.test(value)){
                    type = "email";
                    pattern = ApiGlobalLogic.patterns.regex.email;
                } 
                // test for price
                else if (key.toLowerCase().includes("price")){
                    type = "number";
                    pattern = ApiGlobalLogic.patterns.string.price;
                } 
                // test for number
                else if (typeof value === "number"){
                    type = "number";
                } 
                // test for date
                else if (ApiGlobalLogic.patterns.regex.simpleDate.test(value)){
                    type = "date";
                    pattern = ApiGlobalLogic.patterns.string.complexDate;
                } 
                // test for category
                else if (key.toLowerCase().includes("category")){
                    type = "categories";
                }

                switch(type){
                    case "email":
                        return(
                            <td key={key} className={"EditableTD " + props.tdClassName}>
                                    <input 
                                    onBlur={(event) => {
                                        setNewObjectValue(key, event.target.value);
                                    }} 
                                    onKeyDown={(event) => {if(event.key === "Enter"){
                                        (event.target as HTMLInputElement).blur();
                                    }}} 
                                    type={ type } 
                                    defaultValue={ value } 
                                    pattern={ pattern }
                                />
                            </td>
                        );
                    case "date":
                        return(
                            <td key={key} className={"EditableTD " + props.tdClassName}>
                                <input 
                                    // min={dateToday}
                                    onBlur={(event) => {
                                        setNewObjectValue(key, event.target.value);
                                    }} 
                                    onKeyDown={(event) => {if(event.key === "Enter"){
                                        (event.target as HTMLInputElement).blur();
                                    }}} 
                                    placeholder="dd-mm-yyyy" 
                                    type={ type } 
                                    defaultValue={ value } 
                                />
                            </td>
                        );
                    case "number":
                        return(
                            <td key={key} className={"EditableTD " + props.tdClassName}>
                                <input 
                                    onBlur={(event) => {
                                        setNewObjectValue(key, event.target.value);
                                    }} 
                                    onKeyDown={(event) => {if(event.key === "Enter"){
                                        (event.target as HTMLInputElement).blur();
                                    }}} 
                                    min={0}
                                    type={ type } 
                                    defaultValue={ value } 
                                />
                            </td>
                        );
                    case "categories":
                        return(
                            <td key={key} className={"EditableTD " + props.tdClassName}>
                                <select  
                                key={key}
                                    onBlur={(event) => {
                                        setNewObjectValue(key, event.target.value);
                                    }} 
                                    onKeyDown={(event) => {if(event.key === "Enter"){
                                        (event.target as HTMLInputElement).blur();
                                    }}}
                                    >
                                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </td>
                        );
                    default:
                        return(
                            <td  key={key} className={"EditableTD " + props.tdClassName}>
                                <input 
                                key={key}
                                    onBlur={(event) => {
                                        setNewObjectValue(key, event.target.value);
                                    }}  
                                    onKeyDown={(event) => {if(event.key === "Enter"){
                                        (event.target as HTMLInputElement).blur();
                                    }}} 
                                    type={type}
                                    defaultValue={ value } 
                                />
                            </td>
                        );
                    }
                }
            )
    }
 
    return (
        <tr onClick={props.onClick} id={props.id} className={props.className}>
            {render()}
        </tr>
    );
}