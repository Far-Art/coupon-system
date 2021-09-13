import Icon from '@material-ui/core/Icon';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HomeIcon from '@material-ui/icons/Home';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import { NavLink } from 'react-router-dom';
import "./Menu.css";
import { ClientType } from '../../../Models/ClientType';
import { useAppSelector } from '../../../Redux/Hooks/hooks';
import AddItemElement from '../AddItemElement/AddItemElement';
import { ClientInfoModel } from '../../../Models/ClientInfoModel';

function Menu(): JSX.Element {

    const client = useAppSelector(state => 
        state.currentClientState.client
    );
    
    return (
        <div className="Menu">
            <NavLink className="NAV__BUTTON" to="/home">
                <Icon className="Menu__button" component={HomeIcon} />
            </NavLink>

            {/* display only if active company or admin logged in */}
            { (client as ClientInfoModel)?.active && (client?.clientType === ClientType.ADMIN || client?.clientType === ClientType.COMPANY) &&
                <AddItemElement clientType={client.clientType} />
            }

            {/* display only if client logged in */}
            { client?.clientType !== undefined &&
                <NavLink className="NAV__BUTTON" to="/profile">
                    <Icon className="Menu__button" component={PersonRoundedIcon} />
                </NavLink>
            }

            {/* display cart only for customers type */}
            { client?.clientType === ClientType.CUSTOMER &&
                <NavLink className="NAV__BUTTON" to="/cart">
                    <Icon className="Menu__button" component={ShoppingCartIcon} />
                </NavLink>
            }
            
        </div>
    );
}

export default Menu;