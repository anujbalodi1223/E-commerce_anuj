import { Url } from "url";

export interface products{
    name:string,
    description:string,
    price:string,
    photo:string,
    id:number,
    color:string,
    quantity:undefined|number,
    productid:undefined|number
}

export interface signup{
 name:string,
 password:string,
 email:string
}
export interface carts{
    name:string,
    description:string,
    price:string,
    photo:string,
    id:number|undefined,
    color:string,
    quantity:undefined|number,
    userid:number,
    productid:number
}

export interface amounts{
    amount : number,
    discount:number,
    tax:number,
    totalamount: number,
    delivery : number,
    quantityfiedamount:number
}

export interface orderdata{
    Email:string,
    Address:string,
    Contactdetails:number,
    totalprice:number,
    userid:number,
    id:number|undefined
}
