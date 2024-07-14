import { orderProducts } from "./orderProducts.model";

export interface Order {
    OrderId: number;
    OrderDate: string | null ;
    UserId: string;
    Products: orderProducts [];
    PaymentType: string;
    clientEmail?: string;
    clientName?:string; 
    clientPhone?: number
    totalPrice?: number; 
}

