import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts() {
    let URL = environment.jsonBaseApi + 'products.json';

    return this.http.get<any[]>(URL);
  }
}
