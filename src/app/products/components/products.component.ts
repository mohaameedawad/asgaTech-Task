import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit  {

  products: object[] = []
  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe((res: any) => {
      
      this.products = res
      console.log(this.products)
    }
    )
  }
}
