export class CouponModel{
    id!:number;
    companyName!:string;
    companyEmail!:string;
    category!:string;
    title!:string;
    description?:string;
    startDate!:Date;
    endDate!:Date;
    amount!:number;
    price!:number;
    image?:string;
}