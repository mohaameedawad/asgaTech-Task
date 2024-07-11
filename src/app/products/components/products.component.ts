import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from "../../shared/interfaces/product.model";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit  {

  products: Product[] = []
  constructor(private productService: ProductsService) { }

  
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products.map(product => ({ ...product, editing: false }));
    });
  }

  startEditing(product: Product) {
    product.editing = true;
  }

  updateQuantity(product: Product) {
    this.productService.editProductQuantity(product.ProductId, product.AvailablePieces);
    product.editing = false;
  }
}