import { ColorPaletteTypes } from "../../Models/ColorPaletteTypes";

export interface ColorPaletteAction {
    type: ColorPaletteType;
    payload: ColorPaletteTypes;
}

export enum ColorPaletteType {
    CHANGE_PALETTE = "CHANGE_PALETTE"
}

export function changePalette(palette: ColorPaletteTypes): ColorPaletteAction {
    return { type: ColorPaletteType.CHANGE_PALETTE, payload: palette };
}