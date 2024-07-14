import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Product } from "../../../shared/interfaces/product.model";
import { map, of, tap } from 'rxjs';
import { Order } from '../../../shared/interfaces/order.model';
import { orderProducts } from '../../../shared/interfaces/orderProducts.model';

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
        
        this.orders.forEach((x: any) => {
          x.totalPrice = this.getTotalPrice(x.Products);          
        });
        localStorage.setItem('orders', JSON.stringify(this.orders));
      })
    );
  }
  
  getTotalPrice(products: orderProducts[]) {
    let sum = 0;
    for (let i = 0; i < products?.length; i++) {
      const product = this.products.find(p => p.ProductId === products[i].ProductId);
      if (product) {
        sum += product.ProductPrice * products[i].Quantity;
      }
    }
    return sum.toFixed(2);
  } 


  getCustomerByID(UserId: string) {
    let URL = environment.jsonBaseApi + 'users.json';
    return this.http.get<any[]>(URL).pipe( map( users => users.find(user => user.Id == UserId)));
  }

  getOrderById(orderId: any)  {
      const localOrders = localStorage.getItem('orders');
      if (localOrders) {
        this.orders = JSON.parse(localOrders);
        return of(this.orders).pipe( map( orders => orders.find(order => order.OrderId == orderId)));; // Return an observable
      }
      else {
        let URL = environment.jsonBaseApi + 'orders.json';
        return this.http.get<Order[]>(URL).pipe( map( orders => orders.find(order => order.OrderId == orderId)));
      }    
}

  getProducts() {
    let URL = environment.jsonBaseApi + 'products.json';
    if(this.products.length == 0)
    this.http.get<any[]>(URL).subscribe((res: any) => {
      this.products = res
    });
  }
}
