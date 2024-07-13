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
  showProductFields: boolean = false;

  displayDialog: boolean = false;
  newOrder: any = {
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    paymentMethod: '',
    products: []
  };

  productId!: number | null;
  quantity!: number | null;
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

  toggleProductFields(show: boolean) {
    this.showProductFields = show;
    this.productId = null;
    this.quantity = null;
  }

  addProduct() {
    this.newOrder.products.push({ productId: this.productId, quantity: this.quantity });
    this.toggleProductFields(false);
  }

  hideDialogAndReset() {
    this.resetForm();
    this.displayDialog = false;
  }

  resetForm() {
    this.newOrder = {
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      paymentMethod: '',
      products: []
    };
    this.productId = null;
    this.quantity = null;
    this.showProductFields = false;
  }

  resetProductFields() {
    this.productId = null;
    this.quantity = null;
    this.showProductFields = false;
  }

  addOrder() {
    let ordersInStorage = JSON.parse(localStorage.getItem('orders') || '[]');
    ordersInStorage.push(this.newOrder);
    localStorage.setItem('orders', JSON.stringify(ordersInStorage));
    this.hideDialogAndReset();
  }

  getTotalPrice(products: orderProducts[]): string {
    let sum = 0;
    for (let i = 0; i < products?.length; i++) {
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
