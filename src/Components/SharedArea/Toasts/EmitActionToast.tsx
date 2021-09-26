import { toast } from "react-toastify";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";
import Icon from "@material-ui/core/Icon";
import { CompanyModel } from "../../../Models/CompanyModel";
import { CouponModel } from "../../../Models/CouponModel";
import { CustomerModel } from "../../../Models/CustomerModel";
import GlobalDataStreamer from "../../../Services/GlobalDataStreamer";

interface EmitActionToastProps {
    object: CouponModel | CompanyModel | CustomerModel;
    model: "CouponModel" | "CustomerModel" | "CompanyModel";
    editCallback: Function;
    editCallbackParam: any;
    nonEditableCallbackFunction: Function;
    nonEditableFunctionParam: any;
    deleteCallback?: Function;
    deleteCallbackParam?: any;
    isEditable: boolean;
}

const emitActionToast = (props: EmitActionToastProps) => {
    toast.dismiss(props.object.id); // close previous toasts
    toast.warning(
        () => {
            // Editable case
            if (props.isEditable) {
                switch (props.model) {
                    case "CouponModel":
                        return (
                            <div>
                                {/* message */}
                                <span>
                                    `Coupon id ${props.object.id} action`
                                </span>

                                {/* edit button */}
                                <button
                                    onClick={() => {
                                        props.editCallback(props.editCallbackParam);
                                        toast.dismiss(props.object.id);
                                    }}
                                    className="Toast__button">
                                    {" "}
                                    <Icon component={EditIcon} />
                                </button>

                                {/* delete button */}
                                <button
                                    onClick={() => {
                                        GlobalDataStreamer.deleteCoupon(props.object.id);
                                        toast.dismiss(props.object.id);
                                        props.deleteCallback(props.deleteCallbackParam);
                                    }}
                                    className="Toast__button">
                                    {" "}
                                    <Icon component={DeleteIcon} />
                                </button>
                            </div>
                        );
                }
            }
            // Non editable case
            switch (props.model) {
                case "CouponModel":
                    return (
                        <div>
                            <span>
                                Delete coupon{" "}
                                <span className="Coupon__title">
                                    '{(props.object as CouponModel).title}'
                                </span>{" "}
                                ?
                            </span>
                            <button
                                onClick={() => props.nonEditableCallbackFunction(props.object)}
                                className="Toast__button">
                                {" "}
                                <Icon component={CheckIcon} />{" "}
                            </button>
                            <button
                                onClick={() => toast.dismiss(props.object.id)}
                                className="Toast__button">
                                {" "}
                                <Icon component={CloseIcon} />{" "}
                            </button>
                        </div>
                    );
            }

        },
        // toast properties
        {
            toastId: props.object.id, // prevent duplicate
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

export default emitActionToast;