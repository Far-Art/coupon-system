export class FiltersAppState {
    categories: string[] = [];
    price: number[] = []
    companies: string[] = [];
    freeText:string = "";
    /* set true if any of filters is initialized*/
    filtersActive:boolean = false;
}