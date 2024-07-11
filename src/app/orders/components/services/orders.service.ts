import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Product } from "../../../shared/interfaces/product.model";
import { map } from 'rxjs';
import { Order } from '../../../shared/interfaces/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  products: Product[] = []

  constructor(private http: HttpClient) { 
      this.getProducts()
  }

  getOrders() {
    let URL = environment.jsonBaseApi + 'orders.json';
    return this.http.get<any[]>(URL);
  }

  getCustomerByID(UserId: string) {
    let URL = environment.jsonBaseApi + 'users.json';
    return this.http.get<any[]>(URL).pipe( map( users => users.find(user => user.Id == UserId)));
  }

  getOrderById(orderId: any)  {
    let URL = environment.jsonBaseApi + 'orders.json';
    return this.http.get<Order[]>(URL).pipe( map( orders => orders.find(order => order.OrderId == orderId)));
}

  getProducts() {
    let URL = environment.jsonBaseApi + 'products.json';
    if(this.products.length == 0)
    this.http.get<any[]>(URL).subscribe((res: any) => {
      this.products = res
    });
  }
}
