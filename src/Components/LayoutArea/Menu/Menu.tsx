import FiltersContainer from "../FiltersContainer/FiltersContainer";
import UserLayoutConfig from "../UserLayoutConfig/UserLayoutConfig";
import "./Menu.css";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
            menu
			<FiltersContainer/>
            <UserLayoutConfig/>
        </div>
    );
}

export default Menu;
