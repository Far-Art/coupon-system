import { ColorPaletteAction, ColorPaletteType } from "../Actions/ColorPaletteAction";
import { ColorPaletteState } from "../States/ColorPaletteState";

export default function colorPaletteReducer(paletteState: ColorPaletteState = new ColorPaletteState(), action: ColorPaletteAction): ColorPaletteState {

    const newState = { ...paletteState };

    switch (action.type) {
        case ColorPaletteType.CHANGE_PALETTE:
            newState.palette = action.payload;
            break;
        default:
            return paletteState;
    }
    return newState;
}