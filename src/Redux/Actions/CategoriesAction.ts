export interface CategoriesAction {
    type: CategoriesActionType;
    payload: string[];
}

export enum CategoriesActionType {
    SYNC_CATEGORIES = "SYNC_CATEGORIES"
}

export function syncCategories(categories: string[]): CategoriesAction {
    return { type: CategoriesActionType.SYNC_CATEGORIES, payload: categories };
}