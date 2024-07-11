import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Product } from "../../../shared/interfaces/product.model";
import { map, of, tap } from 'rxjs';
import { Order } from '../../../shared/interfaces/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  products: Product[] = []
  orders: Order[] = []

  constructor(private http: HttpClient) { 
      this.getProducts()
  }


  getOrders() {
    const localOrders = localStorage.getItem('orders');
    if (localOrders) {
      this.orders = JSON.parse(localOrders);
      return of(this.orders); // Return an observable
    }

    const URL = environment.jsonBaseApi + 'orders.json';
    return this.http.get<Order[]>(URL).pipe(
      tap((res: Order[]) => {
        this.orders = res;
        localStorage.setItem('orders', JSON.stringify(this.orders));
      })
    );
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
