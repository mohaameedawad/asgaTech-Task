import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Product } from "../../../shared/interfaces/product.model";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  products: Product[] = []

  constructor(private http: HttpClient) { 
    if(this.products.length == 0) {
      this.getProducts()
    }
  }

  getOrders() {
    let URL = environment.jsonBaseApi + 'orders.json';

    return this.http.get<any[]>(URL);
  }

  getProducts() {
    let URL = environment.jsonBaseApi + 'products.json';
    if(this.products.length == 0)
    this.http.get<any[]>(URL).subscribe((res: any) => {
      this.products = res
    });
  }
}
