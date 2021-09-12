import ApiGlobalLogic from "./ApiGlobalLogic";

export default class DateUtility{
    public static convertDateToDDMMYYYY(date:string | Date){
        const newDate = new Date(date + "Z"); // convert to UTC
        // console.log(newDate.getUTCDate().toString());
        // console.log(date);
        if(date !== null || date !== undefined){
            // console.log(ApiGlobalLogic.patterns.regex.simpleDate.test(date.toString())  + " " + date);
            // let convertedDate = newDate.getUTCDate + "-" + newDate.getUTCMonth + "-" + newDate.getUTCFullYear;
            // console.log(convertedDate + " converted");

            // date.toString();
        }
        // if(typeof newDate === "object"){

        // }
    }
}