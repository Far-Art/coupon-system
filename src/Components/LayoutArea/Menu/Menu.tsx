import Icon from '@material-ui/core/Icon';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import { NavLink } from 'react-router-dom';
import "./Menu.css";
import { ClientType } from '../../../Models/ClientType';
import { useAppSelector } from '../../../Redux/Hooks/hooks';
import CreateNewItem from '../CreateNewItem/CreateNewItem';

function Menu(): JSX.Element {

    const client = useAppSelector(state => 
        state.currentClientState.client
    );
    
    return (
        <div className="Menu">
            <NavLink to="/home">
                <Icon className="Menu__button" component={HomeIcon} />
            </NavLink>

            {/* display only if company or admin logged in */}
            { (client?.clientType === ClientType.ADMIN || client?.clientType === ClientType.COMPANY) &&
                
                <Icon onClick={() => {}} className="Menu__button" component={AddIcon} />
                
            }

            {/* display only if client logged in */}
            { (client?.clientType !== undefined) &&
                <NavLink to="/profile">
                    <Icon className="Menu__button" component={PersonRoundedIcon} />
                </NavLink>
            }

            {/* display cart only for customers type */}
            { ( client?.clientType === ClientType.CUSTOMER ||
                client?.clientType === undefined ) &&
                <NavLink to="/cart">
                    <Icon className="Menu__button" component={ShoppingCartIcon} />
                </NavLink>
            }
            <CreateNewItem clientType={ClientType.ADMIN} />
        </div>
    );
}

export default Menu;