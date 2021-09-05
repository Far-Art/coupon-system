export class FiltersAppState {
    categoriesList: string[] = [];
    priceList: number[] = []
    companiesList: string[] = [];
    freeText:string = "";
    /* set true if any of filters is initialized*/
    filtersActive:boolean = false;
}