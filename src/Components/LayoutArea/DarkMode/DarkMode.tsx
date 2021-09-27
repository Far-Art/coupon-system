import { ColorPaletteTypes } from "../../../Models/ColorPaletteTypes";
import { changePalette } from "../../../Redux/Actions/ColorPaletteAction";
import { useAppSelector } from "../../../Redux/Hooks/hooks";
import { store } from "../../../Redux/Store/Store";
import NightlightIcon from '@mui/icons-material/Nightlight';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Icon from "@material-ui/core/Icon";
import "./DarkMode.css";
import { useState } from "react";

export default function DarkMode(): JSX.Element {

    // store color palette subscribe
    const colorPalette = useAppSelector(state => state.colorPaletteState.palette);

    const [toggled, setToggled] = useState<boolean>(colorPalette === ColorPaletteTypes.NORMAL ? false : true);

    function clickHandle() {
        isToggled();
        if (colorPalette === ColorPaletteTypes.DARK) {
            store.dispatch(changePalette(ColorPaletteTypes.NORMAL));
        } else {
            store.dispatch(changePalette(ColorPaletteTypes.DARK));
        }
    }

    function isToggled() {
        if (toggled) {
            setToggled(false);
        } else {
            setToggled(true);
        }
    }

    return (
        <div className="DarkMode">
            <button className="DarkModeButton APP__BUTTON" onClick={() => clickHandle()}>
                <div className={"DarkModeIconContainer " + (toggled ? "DarkModeToggled" : "")} >
                    <Icon className={"DarkModeIcons NightIcon " + (toggled ? "NightIconToggled" : "")} component={NightlightIcon} />
                    <Icon className={"DarkModeIcons LightIcon " + (toggled ? "LightIconDisabled" : "")} component={WbSunnyIcon} />
                </div>
            </button>
        </div>
    );
}