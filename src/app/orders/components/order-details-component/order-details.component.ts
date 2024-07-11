import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Order } from "../../../shared/interfaces/order.model";
import { DatePipe } from '@angular/common';  // Import DatePipe

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent implements OnInit {
  order!: Order;
  orderId: number | undefined;
  customer: any;

  constructor(private ordersService: OrdersService,
              private actRoute: ActivatedRoute,
              private datePipe: DatePipe) {

    this.actRoute.params.subscribe((params: Params) => {
        this.orderId = params['id'];
      });
}

  ngOnInit(): void {
    this.getOrderById();
  }
  
  getOrderById() {
    this.ordersService.getOrderById(this.orderId).subscribe((res: any) => {
      this.order = res;
      this.order.OrderDate = this.datePipe.transform(this.order?.OrderDate, 'EEE MMM dd yyyy');

      this.getCustomerDetails();
  })    
}

getCustomerDetails() {
  if(this.order)
    this.ordersService.getCustomerByID(this.order.UserId).subscribe((res: any) => {
      this.customer = res
    })
}

getProductName(id: number): any {
  var product = this.ordersService.products.find((x: any) => x.ProductId === id);
  if (product) 
    return product.ProductName;
}

}
