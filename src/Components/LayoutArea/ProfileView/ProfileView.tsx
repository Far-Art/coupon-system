import { useEffect } from "react";
import { ClientInfoModel } from "../../../Models/ClientInfoModel";
import { useAppSelector } from "../../../Redux/Hooks/hooks";
import GlobalDataStreamer from "../../../Services/GlobalDataStreamer";
import ClientCard from "../ClientCard/ClientCard";
import "./ProfileView.css";

function ProfileView(): JSX.Element {

    const client = useAppSelector(state => 
        state.currentClientState.client
    );

    useEffect(() => {
        GlobalDataStreamer.fetchClientInfo();
    },[]);
    
    return (
        <div className="ProfileView">
			<ClientCard client={client as ClientInfoModel} />
        </div>
    );
}

export default ProfileView;
