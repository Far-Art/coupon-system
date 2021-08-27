export class CouponModel{
    id!:number;
    companyName!:string;
    category!:string;
    title!:string;
    description?:string;
    endDate!:Date;
    amount!:number;
    price!:number;
    image?:string;
}