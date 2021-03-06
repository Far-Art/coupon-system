export class FiltersAppState {
    id: number = -99; // initial value must be less than zero
    categoriesList: string[] = [];
    priceList: number = -99; // initial value must be less than zero
    companiesList: string[] = [];
    freeText: string = "";
    /* set true if any of filters is initialized*/
    filtersActive: boolean = false;
}