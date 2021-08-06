import FiltersContainer from "../../FiltersArea/FiltersContainer/FiltersContainer";
import UserLayoutConfig from "../UserLayoutConfig/UserLayoutPreferences";
import "./Menu.css";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
			<FiltersContainer />
            <UserLayoutConfig />
        </div>
    );
}

export default Menu;
