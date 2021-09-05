import { toast } from "react-toastify";
import { CouponModel } from "../../../Models/CouponModel";
import CouponCard from "../../CouponsArea/CouponCard/CouponCard";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';
import "./CouponsContainer.css";

interface ContainerProps{
    couponsList:CouponModel[];
    editable?: boolean;
    asList?: boolean;
}

function CouponsContainer(props:ContainerProps): JSX.Element {
    function render(){
        if(props.asList){
            return(
                <table className="Coupons__table">
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Start Date</th>
                            <th>End date</th>
                            <th>Amount</th>
                            <th>Price</th>
                            <th>Image</th>
                        </tr>
                        {props.couponsList.map(c => 
                                <tr key={c.id} onClick={() => {
                                    toast.warning(
                                    <div>
                                        <span>Coupon id {c.id}</span>
                                        <button className="Toast__button" ><Icon component={EditIcon} /></button>
                                        <button className="Toast__button" ><Icon component={DeleteIcon} /></button>
                                    </div>
                                    , 
                                    {
                                        toastId: c.id, // prevent duplicate
                                        position: "top-center",
                                        theme:"colored",
                                        autoClose: false,
                                        hideProgressBar: true,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        
                                        });
                                }}>
                                    <td className="table__center_text">{c.id}</td>
                                    <td>{c.title}</td>
                                    <td>{c.category}</td>
                                    <td>{c.description}</td>
                                    <td className="table__center_text">{c.startDate}</td>
                                    <td className="table__center_text">{c.endDate}</td>
                                    <td className="table__center_text">{c.amount}</td>
                                    <td className="table__center_text">{c.price}</td>
                                    <td>{c.image}</td>
                                </tr>
                                
                        )}
                </table>
            );
        }

        return (props.couponsList.map(c => <CouponCard coupon={c} key={c.id} />));
    }
    return (
        <div className="CouponsContainer">
            {render()}
        </div>
    );
}
export default CouponsContainer;