import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { OrdersService } from "../services/orders.service";
import { Order } from "../../../shared/interfaces/order.model";
import { orderProducts } from "../../../shared/interfaces/orderProducts.model";


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit  {
  
  orders: Order[] = []
  currentPage = 1;
  pageSize = 10;

  constructor(private ordersService: OrdersService) { }

  ngOnInit() {
    this.ordersService.getOrders().subscribe((res: any) => {

      this.orders = res;
      this.orders.forEach((x: any) => {
        x.totalPrice = this.getTotalPrice(x.Products);
        })
    }
  )
  }

  getTotalPrice(products: orderProducts[]): string {
    let sum = 0; 
    for (let i = 0; i < products.length ; i++) {
      const product = this.ordersService.products.find(p => p.ProductId === products[i].ProductId);
      if (product) {
        sum += product.ProductPrice * products[i].Quantity;
        console.log( products[i].ProductId,sum)
      }
    }
    return sum.toFixed(2); 
  }
  


  getProductName(id: number): any {
    var product = this.ordersService.products.find((x: any) => x.ProductId === id);
    if (product) 
      return product.ProductName;
  }

 
}
