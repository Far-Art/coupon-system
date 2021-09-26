import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import Icon from "@material-ui/core/Icon";
import { toast } from "react-toastify";
import { clearCart, deleteInBatchFromCart } from "../../../Redux/Actions/CartAction";
import { useAppSelector } from "../../../Redux/Hooks/hooks";
import { store } from "../../../Redux/Store/Store";
import AppCurrencySymbol from "../../../Services/Currency";
import GlobalDataStreamer from "../../../Services/GlobalDataStreamer";
import CouponsContainer from "../../CouponsArea/CouponsContainer/CouponsContainer";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import "./Cart.css";
import { useCallback, useEffect, useState } from "react";

export default function Cart(): JSX.Element {
    const coupons = useAppSelector(
        (state) => state.cartAppState.forPurchaseCouponsList
    );

    const [state, setState] = useState<"happy" | undefined>(undefined);

    const removeExpiredCoupons = useCallback(() => {
        const timeNowInMillis = Date.parse(new Date().toLocaleDateString());
        const toDelete: number[] = [];
        for (const c of coupons) {
            if (
                Date.parse(new Date(c.endDate).toLocaleDateString()) <
                timeNowInMillis
            ) {
                toDelete.push(c.id);
            }
        }
        store.dispatch(deleteInBatchFromCart(toDelete));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        removeExpiredCoupons();
    }, [removeExpiredCoupons]);

    function buyHandler() {
        if (store.getState().currentClientState.client) {
            const toPurchase = coupons.map((c) => c.id);
            GlobalDataStreamer.purchaseCoupons(toPurchase).then(() =>
                setState("happy")
            );
        } else {
            toast.warn("You must be logged in for making purchases", {
                toastId: "NotLoggedInToast",
                theme: "colored",
            });
        }
    }

    function clearCartHandler() {
        toast.warning(
            <div>
                <span>All coupons will be deleted from your cart</span>
                <button
                    onClick={() => store.dispatch(clearCart())}
                    className="Toast__button"
                >
                    <Icon component={CheckIcon} />
                </button>
                <button
                    onClick={() => toast.dismiss("Cart_Clean")}
                    className="Toast__button"
                >
                    <Icon component={CloseIcon} />
                </button>
            </div>,
            {
                toastId: "Cart_Clean",
                theme: "colored",
                position: "top-center",
                autoClose: 10000,
            }
        );
    }

    function classNameHandler() {
        if (coupons.length > 0) {
            return "";
        } else {
            return "DISABLED__BUTTON";
        }
    }

    function isDisabledHandler() {
        if (coupons.length > 0) {
            return false;
        } else {
            return true;
        }
    }

    return (
        <div className="Cart">
            {coupons.length > 0 ? (
                <CouponsContainer
                    couponsList={coupons}
                    asList={true}
                    ignoreFields={[
                        "startdate",
                        "amount",
                        "id",
                        "companyentity",
                        "companyemail",
                    ]}
                />
            ) : (
                <>
                    <EmptyView state={state} text="Your cart is empty" />
                </>
            )}

            <div className="Button__Container">
                <button
                    disabled={isDisabledHandler()}
                    onClick={() => buyHandler()}
                    className={"APP__BUTTON " + classNameHandler()}
                >
                    Buy
                </button>
                <p className="CartInfoField">
                    {coupons.length}{" "}
                    {coupons.length === 1 ? (
                        <span>coupon</span>
                    ) : (
                        <span>coupons</span>
                    )}{" "}
                    in cart
                </p>
                <p className="CartInfoField">
                    Total price{" "}
                    {coupons.reduce(
                        (sum, currentCoupon) => sum + currentCoupon.price,
                        0
                    )}
                    {AppCurrencySymbol}
                </p>
                <button
                    disabled={isDisabledHandler()}
                    onClick={() => clearCartHandler()}
                    className={"APP__BUTTON " + classNameHandler()}
                >
                    Clear cart
                </button>
            </div>
        </div>
    );
}