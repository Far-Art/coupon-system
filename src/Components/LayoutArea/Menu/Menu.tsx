import Icon from '@material-ui/core/Icon';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HomeIcon from '@material-ui/icons/Home';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import { NavLink } from 'react-router-dom';
import "./Menu.css";
import { ClientType } from '../../../Models/ClientType';
import { useAppSelector } from '../../../Redux/Hooks/hooks';

function Menu(): JSX.Element {

    const client = useAppSelector(state => 
        state.currentClientState.client
    );
    
    return (
        <div className="Menu">
            <NavLink to="/home">
                <Icon className="Menu__button" component={HomeIcon} />
            </NavLink>
            <NavLink to="/profile">
                <Icon className="Menu__button" component={PersonRoundedIcon} />
            </NavLink>
            { client?.clientType === ClientType.CUSTOMER ||
            client?.clientType === undefined &&
                <NavLink to="/cart">
                    <Icon className="Menu__button" component={ShoppingCartIcon} />
                </NavLink>
            }
        </div>
    );
}

export default Menu;