import { Component, OnInit } from '@angular/core';
import { OrdersService } from "../services/orders.service";
import { Order } from "../../../shared/interfaces/order.model";
import { orderProducts } from "../../../shared/interfaces/orderProducts.model";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  
  orders: Order[] = [];
  displayDialog: boolean = false;
  newOrder: any = {
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    paymentMethod: '',
    products: []
  };

  productId!: number |null  ;
  quantity!: number |null ;
  canAddProduct: boolean = false;
  paymentMethods: any[] = ['Cash', 'Online'];

  constructor(private ordersService: OrdersService) {}

  ngOnInit() {
    this.getOrders();
  }
  
  getOrders() {
    this.ordersService.getOrders().subscribe((res: any) => {
      this.orders = res;
      this.orders.forEach((x: any) => {
        x.totalPrice = this.getTotalPrice(x.Products);
      });
    });
  }

  checkProductFields() {
    if(this.productId && this.quantity )
      this.canAddProduct = true;
    else
      this.canAddProduct = false;
  }

  addProduct() {
      this.newOrder.products.push({ productId: this.productId, quantity: this.quantity });
      this.resetProductFields();
  }

  resetProductFields() {
    this.productId = null;
    this.quantity = null;
    this.canAddProduct = false;
  }

  addOrder() {
    
    let ordersInStorage = JSON.parse(localStorage.getItem('orders') || '[]');
    ordersInStorage.push(this.newOrder);
    localStorage.setItem('orders', JSON.stringify(ordersInStorage));

    this.newOrder = {
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      paymentMethod: '',
      products: []
    };

    this.hideDialog(); // Close dialog after order is added
  }

  getTotalPrice(products: orderProducts[]): string {
    let sum = 0;
    for (let i = 0; i < products.length; i++) {
      const product = this.ordersService.products.find(p => p.ProductId === products[i].ProductId);
      if (product) {
        sum += product.ProductPrice * products[i].Quantity;
      }
    }
    return sum.toFixed(2);
  }

  getProductName(id: number): any {
    const product = this.ordersService.products.find((x: any) => x.ProductId === id);
    if (product) return product.ProductName;
  }

  showDialog() {
    this.displayDialog = true;
  }

  hideDialog() {
    this.displayDialog = false;
  }
}
