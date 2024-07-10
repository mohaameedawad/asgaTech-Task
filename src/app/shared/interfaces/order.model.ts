import { orderProducts } from "./orderProducts.model";

export interface Order {
    OrderId: number;
    OrderDate: string;
    UserId: string;
    Products: orderProducts [];
    PaymentType: string;
}

