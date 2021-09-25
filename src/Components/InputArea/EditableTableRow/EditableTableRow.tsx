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
import AppCurrencySymbol from "../../../Services/Currency";
import { useForm } from "react-hook-form";

interface EditableTableRowProps {
    coupon?: CouponModel;
    object: Map<string, any>;
    ignoreFields?: string[];
    nonEditableFields?: string[];
    className?: string;
    tdClassName?: string;
    id?: any;
    editable?: boolean;
    isHeader?: boolean;
    onClick?: MouseEventHandler<HTMLTableRowElement> | undefined;
    onSave?: React.Dispatch<React.SetStateAction<any>>;
}

export default function EditableTableRow(props: EditableTableRowProps): JSX.Element {

    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<CouponModel>();

    // useEffect(() => {
    //     register("title",{
    //         required:{ value: true, message: "Title required"},
    //         minLength: { value: ApiGlobalLogic.items.coupon.fieldsMinLength.title, message: ApiGlobalLogic.errorDescriptions.minLength.couponTitle}},

    //             )
    // },[register]);

    const send = (coupon: CouponModel) => {
        // GlobalDataStreamer.addCoupon(coupon);
        console.log("handle submit");
        // console.log(coupon);

    }

    // const [newObject, setNewObject] = useState<CouponModel>({...props.coupon});

    // const [objectMap, setObjectMap] = useState<Map<string, any>>(new Map());

    // const [categories] = useState<string[]>(store.getState().categoriesAppState.categories);

    // useEffect(() => {
    //     console.log("in useEffect of tr");
    // setObjectMap(props.object);
    // {(props.editable === undefined ? true : props.editable) && emitToast()}
    // toast.update("TableEditToast", {
    //     render: toastComponent(newObject)
    // });
    // },[props.object]);

    // const setNewObjectValue = (key:any, value:any) => {
    //     const map:Map<any, any> = new Map(Object.entries(newObject));
    //     map.set(key, value);
    //     setNewObject(Object.fromEntries(map));
    // }

    // const toastComponent = (object:any) => {
    //     return(
    //         <div>
    //             <span>Save / Cancel changes? </span>
    //             <button 
    //                 onClick={() => {
    //                     if(props.onSave){
    //                         GlobalDataStreamer.updateCoupon(object).then((result) => {
    //                             if(!result){
    //                                 // setNewObject(props.coupon);
    //                             }
    //                         });
    //                         props.onSave(0); // cancel editing
    //                     }
    //                 }} 
    //                 className="Toast__button" ><Icon component={CheckIcon} /></button>
    //             <button 
    //                 className="Toast__button" 
    //                 onClick={() => {
    //                     if(props.onSave){
    //                         // setNewObject(props.coupon);
    //                         props.onSave(0); // cancel editing
    //                     }
    //                 }}
    //                 >
    //             <Icon component={CloseIcon} />
    //             </button>
    //         </div>
    //     )
    // }

    // function emitToast(){
    //     toast.warning(
    //         toastComponent, {
    //             toastId: "TableEditToast",
    //             theme:"colored",
    //             position:"top-center",
    //             autoClose: false
    //         });
    // }

    function setCellWidth(key: string) {
        switch (key.toLowerCase().replaceAll(" ", "")) {
            case "id":
                return { width: "50%" }
            case "amount":
                return { width: "55%" }
        }
    }

    function render() {
        let counter = 1;
        // check if data represent a header
        if (props.isHeader === true) {
            return (Array.from(props.object.keys()).map(key =>
                <th style={setCellWidth(key)} key={key + counter++} className={"EditableTD " + props.tdClassName}>
                    {key}
                </th>
            ));
        }

        return Array.from(props.object).map(([key, value]) => {
            // check for non editable fields
            if (props.nonEditableFields) {
                for (const nonEditable of props.nonEditableFields) {
                    if (key.toLowerCase().includes(nonEditable)) {
                        return (
                            <td key={key + counter++} className={"EditableTD " + props.tdClassName}>
                                {key.includes("price") ? value + AppCurrencySymbol : value + ""}
                            </td>
                        )
                    }
                }
            }

            // check if edit is not allowed
            if (props.editable === false) {
                return (
                    <td key={key + counter++} className={"EditableTD " + props.tdClassName}>
                        {key.includes("price") ? value + AppCurrencySymbol : value + ""}
                    </td>
                )
            }

            // return (
            //     <>
            // <td key={key + counter++}>
            //     <form>
            //     <select 
            //     onChange={(event) => setValue("category", event.target.value)} 
            //     defaultValue={value} 
            //     className="SELECT" >
            //         {store.getState().categoriesAppState.categories.map(category => <option key={category} value={category}>{category}</option>)}
            //     </select>
            //     </form>
            // </td>
            //         <td key={key + counter++}>

            //                 <input 
            //                     maxLength={ApiGlobalLogic.items.coupon.fieldsMaxLength.title} 
            //                     type="text" className="FIELD" 
            //                     placeholder="title" 
            //                     defaultValue={value}
            //                     {...register("title", {
            //                     required: {
            //                         value: true,
            //                         message: "Title required"
            //                     },
            //                     minLength: {
            //                         value: ApiGlobalLogic.items.coupon.fieldsMinLength.title,
            //                         message: ApiGlobalLogic.errorDescriptions.minLength.couponTitle
            //                     }
            //                 })} />
            //                 {errors.title && <p className="ETDError">{errors.title.message}</p>}

            //         </td>
            //         <td key={key + counter++}>

            //                 <button type="submit">submit</button>

            //         </td>
            //     </>
            // )

            // // set pattern and type for input
            // let type = "text";
            // let pattern:any;

            // if (key.toLowerCase().includes("amount")){
            //     type = "number";
            //     pattern = ApiGlobalLogic.patterns.string.integers;
            // } 
            switch (key.toLowerCase().replaceAll(" ", "")) {
                case "category":
                    return (
                        <td key={key + counter++}>

                            <select
                                onChange={(event) => setValue("category", event.target.value)}
                                defaultValue={value}
                                className="SELECT" >
                                {store.getState().categoriesAppState.categories.map(category => <option key={category} value={category}>{category}</option>)}
                            </select>

                        </td>
                    )
                case "title":
                    return (
                        <td key={key + counter++}>

                            <input
                                maxLength={ApiGlobalLogic.items.coupon.fieldsMaxLength.title}
                                type="text"
                                className="FIELD"
                                placeholder="title"
                                defaultValue={value}
                                {...register("title", {
                                    required: {
                                        value: true,
                                        message: "Title required"
                                    },
                                    minLength: {
                                        value: ApiGlobalLogic.items.coupon.fieldsMinLength.title,
                                        message: ApiGlobalLogic.errorDescriptions.minLength.couponTitle
                                    },
                                })} />
                            {errors.title && <p className="ETDError">{errors.title.message}</p>}

                        </td>
                    )
                case "description":
                    return (
                        <td key={key + counter++}>

                            <input
                                maxLength={ApiGlobalLogic.items.coupon.fieldsMaxLength.description}
                                type="text"
                                className="FIELD"
                                placeholder="description"
                                defaultValue={value}
                                {...register("description", {
                                    required: false
                                })} />

                        </td>
                    )
                case "startdate":
                    return (
                        <td key={key + counter++}>

                            <input
                                type="date"
                                className="FIELD"
                                placeholder="start date"
                                defaultValue={value}
                                {...register("startDate", {
                                    required: {
                                        value: true,
                                        message: "Start date required"
                                    },
                                    pattern: {
                                        value: ApiGlobalLogic.patterns.regex.complexDate,
                                        message: "Invalid date"
                                    }
                                })} />
                            {errors.startDate && <p className="ETDError">{errors.startDate.message}</p>}

                        </td>
                    )
                case "enddate":
                    return (
                        <td key={key + counter++}>

                            <input
                                type="date"
                                className="FIELD"
                                placeholder="end date"
                                defaultValue={value}
                                {...register("endDate", {
                                    required: {
                                        value: true,
                                        message: "End date required"
                                    },
                                    pattern: {
                                        value: ApiGlobalLogic.patterns.regex.complexDate,
                                        message: "Invalid date"
                                    }
                                })} />
                            {errors.endDate && <p className="ETDError">{errors.endDate.message}</p>}

                        </td>
                    )
                case "amount":
                    return (
                        <td key={key + counter++}>

                            <input
                                step="any"
                                min={ApiGlobalLogic.items.coupon.fieldsMinLength.amount}
                                type="number"
                                className="FIELD"
                                placeholder="amount"
                                defaultValue={value}
                                {...register("amount", {
                                    required: {
                                        value: true,
                                        message: "Amount required"
                                    },
                                    pattern: {
                                        value: ApiGlobalLogic.patterns.regex.numbers,
                                        message: ApiGlobalLogic.errorDescriptions.badPattern.amount
                                    }
                                })} />
                            {errors.amount && <p className="ETDError">{errors.amount.message}</p>}

                        </td>
                    )
                case "price":
                    return (
                        <td key={key + counter++}>

                            <input
                                step="any"
                                min={ApiGlobalLogic.items.coupon.fieldsMinLength.price}
                                max={ApiGlobalLogic.items.coupon.fieldsMaxLength.price}
                                type="number"
                                className="FIELD"
                                placeholder="price"
                                defaultValue={value}
                                {...register("price", {
                                    required: {
                                        value: true,
                                        message: "Price required"
                                    }
                                })} />
                            {errors.price && <p className="ETDError">{errors.price.message}</p>}

                        </td>
                    )
                case "image1":
                    return (
                        <td key={key + counter++}>

                            <input
                                type="file"
                                className="FIELD"
                                placeholder="image"
                                defaultValue={value + ""}
                                {...register("image", {
                                    required: false
                                })} />
                            {errors.image && <p className="ETDError">{errors.image.message}</p>}

                        </td>
                    )


            }

            // // test for email
            // else if (ApiGlobalLogic.patterns.regex.email.test(value)){
            //     type = "email";
            //     pattern = ApiGlobalLogic.patterns.regex.email;
            // } 
            // // test for price
            // else if (key.toLowerCase().includes("price")){
            //     type = "price";
            //     pattern = ApiGlobalLogic.patterns.string.price;
            // } 
            //     // test for number
            //     else if (typeof value === "number"){
            //         type = "number";
            //     } 
            //     // test for date
            //     else if (ApiGlobalLogic.patterns.regex.simpleDate.test(value)){
            //         type = "date";
            //         pattern = ApiGlobalLogic.patterns.string.complexDate;
            //     } 
            //     // test for category
            // else if (key.toLowerCase().includes("category")){
            //     type = "categories";
            // }
            // // test for image
            // else if (key.toLowerCase().includes("image")){
            //     console.log("here");
            //     type = "image";
            // }

            // switch(type){
            //     case "email":
            //         return(
            //             <td key={key} className={"EditableTD " + props.tdClassName}>
            //                     <input 
            //                     onBlur={(event) => {
            //                         setNewObjectValue(key, event.target.value);
            //                     }} 
            //                     onKeyDown={(event) => {if(event.key === "Enter"){
            //                             (event.target as HTMLInputElement).blur();
            //                         }}} 
            //                         type={ type } 
            //                         defaultValue={ value } 
            //                         pattern={ pattern }
            //                     />
            //                 </td>
            //             );
            //         case "date":
            //             return(
            //                 <td key={key} className={"EditableTD " + props.tdClassName}>
            //                     <input 
            //                         // min={dateToday}
            //                         onBlur={(event) => {
            //                             setNewObjectValue(key, event.target.value);
            //                         }} 
            //                         onKeyDown={(event) => {if(event.key === "Enter"){
            //                             (event.target as HTMLInputElement).blur();
            //                         }}} 
            //                         placeholder="dd-mm-yyyy" 
            //                         type={ type } 
            //                         defaultValue={ value } 
            //                     />
            //                 </td>
            //             );
            //         case "number":
            //             return(
            //                 <td key={key} className={"EditableTD " + props.tdClassName}>
            //                     <input 
            //                         onBlur={(event) => {
            //                             setNewObjectValue(key, event.target.value);
            //                         }} 
            //                         onKeyDown={(event) => {if(event.key === "Enter"){
            //                             (event.target as HTMLInputElement).blur();
            //                         }}} 
            //                         min={0} 
            //                         type={ type } 
            //                         defaultValue={ value } 
            //                     />
            //                 </td>
            //             );
            //         case "categories":
            //             return(
            //                 <td key={key} className={"EditableTD " + props.tdClassName}>
            //                     <select  
            //                         key={key}
            //                         onBlur={(event) => {
            //                             setNewObjectValue(key, event.target.value);
            //                         }} 
            //                         onKeyDown={(event) => {if(event.key === "Enter"){
            //                             (event.target as HTMLInputElement).blur();
            //                         }}} 
            //                         defaultValue={value}
            //                         >
            //                         {categories.map(c => <option key={c} value={c}>{c}</option>)}
            //                     </select>
            //                 </td>
            //             );
            //         case "image":
            //                 return(
            //                     <td key={key} className={"EditableTD " + props.tdClassName}>
            //                         <input 
            //                         onBlur={(event) => {
            //                             setNewObjectValue(key, event.target.value);
            //                         }} 
            //                         onKeyDown={(event) => {if(event.key === "Enter"){
            //                             (event.target as HTMLInputElement).blur();
            //                         }}} 
            //                         type={ "file" } 
            //                         defaultValue={ value } 
            //                     />
            //                     </td>
            //                 );
            //         default:
            //             return(
            //                 <td  key={key} className={"EditableTD " + props.tdClassName}>
            //                     <input 
            //                         onBlur={(event) => {
            //                             setNewObjectValue(key, event.target.value);
            //                         }}  
            //                         onKeyDown={(event) => {if(event.key === "Enter"){
            //                             (event.target as HTMLInputElement).blur();
            //                         }}} 
            //                         type={type}
            //                         defaultValue={ value } 
            //                     />
            //                 </td>
            //             );
            //         }
            //     }
            // )
        })
    }

    return (
        <tr onClick={props.onClick} id={props.id} className={props.className}>
            {render()}
        </tr>
    )
}