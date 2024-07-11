import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Product } from "../../shared/interfaces/product.model";
import { of, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  products: Product[] = [];

  constructor(private http: HttpClient) {}

  getProducts() {
    const localProducts = localStorage.getItem('products');
    if (localProducts) {
      this.products = JSON.parse(localProducts);
      return of(this.products); // Return an observable
    }

    const URL = environment.jsonBaseApi + 'products.json';
    return this.http.get<Product[]>(URL).pipe(
      tap((res: Product[]) => {
        this.products = res;
        localStorage.setItem('products', JSON.stringify(this.products));
      })
    );
  }

  editProductQuantity(productId: number, quantity: number) {
    const product = this.products.find(p => p.ProductId === productId);
    if (product) {
      product.AvailablePieces = quantity;
      localStorage.setItem('products', JSON.stringify(this.products));
    }
  }
}
