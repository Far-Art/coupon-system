export interface RevertAction {
    type: RevertActionType;
}

export enum RevertActionType {
    REVERT_STATE = "REVERT_STATE"
}

export function revertState(): RevertAction {
    return { type: RevertActionType.REVERT_STATE };
}