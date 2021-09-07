import { ClientType } from "../../../Models/ClientType";
import { CustomerModel } from "../../../Models/CustomerModel";
import { useAppSelector } from "../../../Redux/Hooks/hooks";
import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import "./NavBar.css";

function NavBar(): JSX.Element {

    const currentClient = useAppSelector(state => state.currentClientState.client);
    
    function renderClientInfo(){
        if(currentClient !== undefined){
            return <>
                <p className="EMPHASIZE_TEXT_COLOR">Good {timeOfDay()} <span>{nameToCapital(currentClient.name) + " " + nameToCapital(currentClient.clientType !== ClientType.COMPANY ? (currentClient as CustomerModel).lastName : "")}</span></p> <Logout />
            </>;
        }
        return <> 
            <p className="EMPHASIZE_TEXT_COLOR">Good {timeOfDay()} guest, please </p> <Login /> <p>for better user experience</p>
        </>;
    }

    function nameToCapital(name:string){
        return name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();
    }

    function timeOfDay(){
        const timeNow = new Date();
        if(timeNow.getHours() >= 21){
            return "night";
        } else if(timeNow.getHours() >= 18) {
            return "evening";
        } else if(timeNow.getHours() >= 12){
            return "afternoon";
        }
        return "morning";
    }

    return (
        <div className={"NavBar WHITE__BG"}>
            {renderClientInfo()}
        </div>
    );
}

export default NavBar;