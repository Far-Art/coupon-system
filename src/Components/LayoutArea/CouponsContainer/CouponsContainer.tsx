import { toast } from "react-toastify";
import { CouponModel } from "../../../Models/CouponModel";
import CouponCard from "../../CouponsArea/CouponCard/CouponCard";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import Icon from "@material-ui/core/Icon";
import "./CouponsContainer.css";
import { store } from "../../../Redux/Store/Store";
import { deleteFromCart } from "../../../Redux/Actions/CartAction";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import EditableTableRow from "./EditableTableRow";
import { useCallback, useEffect, useState } from "react";
import GlobalDataStreamer from "../../../Services/GlobalDataStreamer";
import FiltersContainer from "../../FiltersArea/FiltersContainer/FiltersContainer";
import { useAppSelector } from "../../../Redux/Hooks/hooks";

interface ContainerProps {
    couponsList: CouponModel[]; // coupons list
    editable?: boolean; // allow coupons to be edited
    asList?: boolean; // show coupons as list instead of cards
    onlyValid?: boolean; // omit coupons with zero amount and expired date
    ignoreFields?: string[]; // omit specified fields when rendering coupons
}

export default function CouponsContainer(props: ContainerProps): JSX.Element {
    // sets edit mode
    // const [editCouponWithId, setEditCouponWithId] = useState<number>(0);
    // filtered local coupons map
    const [localCouponsAsMap, setLocalCouponsAsMap] = useState<Map<string, any>[]>([]);

    const appfilters = useAppSelector(state => state.filterAppState);

    /* this function filters coupon list by active filters and props
    ----------------------------------------------------------------------- */
    const filterCoupons = 
        (coupons: CouponModel[]) => {
            let filteredList;
            // skip coupons that are expired or amount is zero
            if(props.onlyValid){
                const timeNowInMillis = Date.parse(new Date().toLocaleDateString());
                filteredList = coupons.filter(c =>
                    {
                        if(c.amount === 0 ){
                            return false;
                        } else if (Date.parse(new Date(c.endDate).toLocaleDateString()) < timeNowInMillis){
                            return false;
                        }
                        return true;
                    }
                );
            } else {
                filteredList = coupons;
            }

            // filter by categories and companies
            if (appfilters.categoriesList.length > 0 || appfilters.companiesList.length > 0) {
                if (appfilters.categoriesList.length > 0 && appfilters.companiesList.length > 0) {
                    filteredList = filteredList.filter((c) =>
                        appfilters.categoriesList.includes(c.category) &&
                        appfilters.companiesList.includes(c.companyName));
                } else if (appfilters.categoriesList.length > 0) {
                    filteredList = filteredList.filter((c) =>
                        appfilters.categoriesList.includes(c.category));
                } else {
                    filteredList = filteredList.filter((c) =>
                        appfilters.companiesList.includes(c.companyName));
                }
            }
            // filter by price
            if (appfilters.priceList >= 0) {
                filteredList = filteredList.filter((c) => c.price <= appfilters.priceList);
            }
            //filter by free text
            if (appfilters.freeText.length > 0) {
                filteredList = filteredList.filter((c) =>
                    c.title.toLowerCase().includes(appfilters.freeText) || c.description?.toLowerCase().includes(appfilters.freeText)
                );
            }
            return filteredList;
        } // eslint-disable-line react-hooks/exhaustive-deps

    /* this function filters coupons array by provided props
    ----------------------------------------------------------------------- */
    const initLocalCouponsMap = 
        (coupons: CouponModel[]) => {
            const tempMapArray: Map<string, any>[] = [];
            if (coupons === undefined || coupons.length === 0) {
                return tempMapArray;
            }
            coupons.forEach((coupon) => {
                const tempCouponAsMap = new Map<string, any>();
                mainLoop: for (const [key, value] of Object.entries(coupon)) {
                    // ignore keys with object by default
                    if ((typeof value === "object" && key.toLowerCase() !== "image") || value === undefined) {
                        continue mainLoop;
                    }
                    //check for ignored fields
                    if (props.ignoreFields !== undefined && props.ignoreFields.length > 0) {
                        for (const ignored of props.ignoreFields) {
                            if (key.toLowerCase() === ignored) {
                                continue mainLoop;
                            }
                        }
                    }
                    // split words by camel case before insert
                    tempCouponAsMap.set(key.split(/(?=[A-Z])/).map(str => str.toLowerCase()).join(' '), value);
                }
                // push coupon as map to array
                tempMapArray.push(tempCouponAsMap);
            });
            return tempMapArray;
        }

        useEffect(() => {
            if(props.couponsList && props.couponsList.length > 0){
                setLocalCouponsAsMap(initLocalCouponsMap(filterCoupons(props.couponsList)));
            }
        }, [props.couponsList, appfilters]);

    /* This function invoked on list render
    ----------------------------------------------------------------------- */
    function renderAsList() {
        if (localCouponsAsMap !== undefined) {
            let counter = 1;
            return (
                <table className="Coupons__table">
                    <thead>
                        <EditableTableRow
                            object={localCouponsAsMap[0]}
                            isHeader={true}
                        />
                    </thead>
                    <tbody>
                        {localCouponsAsMap.map(c => 
                            <EditableTableRow
                                key={counter++}
                                object={c}
                                // className={setWarningClass(c)}
                                tdClassName="table__center_text"
                                // ignoreFields={props.ignoreFields}
                                // nonEditableFields={["id"]}
                                // onSave={setEditCouponWithId}
                             />
                        )}
                        {/* {localCouponsMap.entries().return(c =>  (
                            <EditableTableRow
                            key={c}
                            object={c}
                            className={setWarningClass(c)}
                            tdClassName="table__center_text"
                            ignoreFields={props.ignoreFields}
                            nonEditableFields={["id"]}
                            onSave={setEditCouponWithId}
                             />
                        ))} */}

                    </tbody>
                </table>
            );
        }
    }

    /* if amount is zero or end date is near, set warn class
    ----------------------------------------------------------------------- */
    function setWarningClass(coupon: CouponModel) {
        const timeNowInMillis = Date.parse(new Date().toLocaleDateString());
        if (
            coupon.amount === 0 ||
            Date.parse(new Date(coupon.endDate).toLocaleDateString()) <=
            timeNowInMillis
        ) {
            return "Warn";
        }
        return "";
    }

    /* This function invoked on cards render
    ----------------------------------------------------------------------- */
    function renderAsCards() {
        let counter = 1;
        if (localCouponsAsMap !== undefined) {
            return localCouponsAsMap.map(c => <CouponCard object={c} key={counter++} />);
        }
    }

    /* This function invoked when coupons list is empty
    ----------------------------------------------------------------------- */
    function renderEmptyView() {
        return (
            <EmptyView
                text={
                    store.getState().filterAppState.filtersActive
                        ? "No matching coupons, try changing filters"
                        : "No coupons left"
                }
            />
        );
    }

    /* This function invoked when inside cart delete action happens
    ----------------------------------------------------------------------- */
    function deleteFromCartHandler(coupon: CouponModel) {
        toast.dismiss(coupon.id);
        store.dispatch(deleteFromCart(coupon));
    }

    /* emiting toast component
    ----------------------------------------------------------------------- */
    const emitToast = (coupon: CouponModel) => {
        toast.dismiss(); // close previous toasts
        toast.warning(
            () => {
                // Editable case
                if (props.editable) {
                    return (
                        <div>
                            <span>
                                Coupon id{" "}
                                <span className="Coupon__title">
                                    '{coupon.id}'
                                </span>{" "}
                                action
                            </span>

                            {/* edit button */}
                            <button
                                onClick={() => {
                                    // setEditCouponWithId(coupon.id);
                                    toast.dismiss(coupon.id);
                                }}
                                className="Toast__button"
                            >
                                {" "}
                                <Icon component={EditIcon} />
                            </button>

                            {/* delete button */}
                            <button
                                onClick={() => {
                                    GlobalDataStreamer.deleteCoupon(coupon.id);
                                    toast.dismiss(coupon.id);
                                    // setEditCouponWithId(-1);
                                }}
                                className="Toast__button"
                            >
                                {" "}
                                <Icon component={DeleteIcon} />
                            </button>
                        </div>
                    );
                }
                // Non editable case
                return (
                    <div>
                        <span>
                            Delete coupon{" "}
                            <span className="Coupon__title">
                                '{coupon.title}'
                            </span>{" "}
                            ?
                        </span>
                        <button
                            onClick={() => deleteFromCartHandler(coupon)}
                            className="Toast__button"
                        >
                            {" "}
                            <Icon component={CheckIcon} />{" "}
                        </button>
                        <button
                            onClick={() => toast.dismiss(coupon.id)}
                            className="Toast__button"
                        >
                            {" "}
                            <Icon component={CloseIcon} />{" "}
                        </button>
                    </div>
                );
            },
            // toast properties
            {
                toastId: coupon.id, // prevent duplicate
                position: "top-center",
                theme: "colored",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            }
        );
    };

    /* render logic
    ----------------------------------------------------------------------- */
    const render = () => {
        // if props are empty or undefined
        if (!props.couponsList || props.couponsList.length === 0) {
            return renderEmptyView();
        }

        return (
            <>
                <div className="CouponsCounter">
                    <p>
                        {localCouponsAsMap.length +
                            " coupon" +
                            (localCouponsAsMap.length === 1 ? "" : "s") +
                            " displayed"}
                    </p>
                </div>
                {/* {props.asList ? renderAsList() : renderAsCards()} */}
                {props.asList ? renderAsList() : renderAsList()}
            </>
        );
    };

    /* paint component
    ----------------------------------------------------------------------- */
    return (
        <div className="CouponsContainer">
            <FiltersContainer
                coupons={props.couponsList ? props.couponsList : []}
            />
            <div className="CouponsView">
                { localCouponsAsMap?.length > 0 ? render() : <EmptyView />}
            </div>
        </div>
    );
}