import { useState } from "react";
import { useForm } from "react-hook-form";
import { CouponModel } from "../../../Models/CouponModel";
import { useAppSelector } from "../../../Redux/Hooks/hooks";
import { store } from "../../../Redux/Store/Store";
import ApiGlobalLogic from "../../../Services/ApiGlobalLogic";
import GlobalDataStreamer from "../../../Services/GlobalDataStreamer";
import "./CreateCouponForm.css";

export default function CreateCouponForm(): JSX.Element {

    const [categories] = useState<string[]>(store.getState().categoriesAppState.categories);

    const client = useAppSelector(state =>
        state.currentClientState.client
    );

    const { register, handleSubmit, reset, formState: { errors } } = useForm<CouponModel>({
        defaultValues: { company: client },
    });

    const send = (coupon: CouponModel) => {
        GlobalDataStreamer.addCoupon(coupon);
    }

    return (
        <div className="CreateCouponForm FORM">
            <h2> Create new coupon </h2>
            <form onSubmit={handleSubmit(send)}>


                <select className="SELECT" {...register("category", {
                    required: true,
                })}>
                    {categories.map(category => <option key={category} value={category}>{category}</option>)}
                </select>

                {/* title */}
                <input maxLength={ApiGlobalLogic.items.coupon.fieldsMaxLength.title} type="text" className="FIELD" placeholder="title" {...register("title", {
                    required: {
                        value: true,
                        message: "Title required"
                    },
                    minLength: {
                        value: ApiGlobalLogic.items.coupon.fieldsMinLength.title,
                        message: ApiGlobalLogic.errorDescriptions.minLength.couponTitle
                    }
                })} />
                {errors.title && <p className="Error">{errors.title.message}</p>}

                {/* description */}
                <input maxLength={ApiGlobalLogic.items.coupon.fieldsMaxLength.description} type="text" className="FIELD" placeholder="description" {...register("description", {
                    minLength: {
                        value: ApiGlobalLogic.items.coupon.fieldsMinLength.description,
                        message: `Description must contain at least ${ApiGlobalLogic.items.coupon.fieldsMinLength.description} characters`
                    }
                })} />
                {errors.description && <p className="Error">{errors.description.message}</p>}

                {/* start date */}
                <input type="date" className="FIELD" placeholder="start date" {...register("startDate", {
                    required: {
                        value: true,
                        message: "Start date required"
                    }
                })} />
                {errors.startDate && <p className="Error">{errors.startDate.message}</p>}

                {/* end date */}
                <input type="date" className="FIELD" placeholder="end date" {...register("endDate", {
                    required: {
                        value: true,
                        message: "End date required"
                    }
                })} />
                {errors.endDate && <p className="Error">{errors.endDate.message}</p>}

                {/* amount */}
                <input step="any" min={ApiGlobalLogic.items.coupon.fieldsMinLength.amount} type="number" className="FIELD" placeholder="amount" {...register("amount", {
                    required: {
                        value: true,
                        message: "Amount required"
                    },
                    pattern: {
                        value: ApiGlobalLogic.patterns.regex.numbers,
                        message: ApiGlobalLogic.errorDescriptions.badPattern.amount
                    }
                })} />
                {errors.amount && <p className="Error">{errors.amount.message}</p>}

                {/* price */}
                <input step="any" min={ApiGlobalLogic.items.coupon.fieldsMinLength.price} max={ApiGlobalLogic.items.coupon.fieldsMaxLength.price} type="number" className="FIELD" placeholder="price" {...register("price", {
                    required: {
                        value: true,
                        message: "Price required"
                    }
                })} />
                {errors.price && <p className="Error">{errors.price.message}</p>}

                <button
                    type="reset"
                    onClick={() => {
                        reset();
                    }} className="BUTTON__AS_LINK">reset form</button>
                <br />
                <button type="submit" className="FIELD LINK APP__BUTTON">Create</button>

            </form>
        </div>
    );
}