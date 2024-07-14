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
  ProductId!: number | null;
  Quantity!: number | null;
  canAddProduct: boolean = false;
  paymentMethods: any[] = ['Cash', 'Online'];
  
  newOrder: any = {
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    PaymentType: '',
    products: [],
    totalPrice: ''
  };


  constructor(private ordersService: OrdersService) {}

  ngOnInit() {
    this.getOrders();
  }
  
  getOrders() {
    this.ordersService.getOrders().subscribe((res: any) => {
      this.orders = res;
    });
  }

  toggleProductFields(show: boolean) {
    this.showProductFields = show;
    this.ProductId = null;
    this.Quantity = null;
  }

  addProduct() {
    this.newOrder.products.push({ ProductId: this.ProductId, Quantity: this.Quantity });
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
    this.ProductId = null;
    this.Quantity = null;
    this.showProductFields = false;
  }

  resetProductFields() {
    this.ProductId = null;
    this.Quantity = null;
    this.showProductFields = false;
  }

  addOrder() {
    let ordersInStorage = JSON.parse(localStorage.getItem('orders') || '[]');
    var Order = {
            OrderId:   (ordersInStorage[ordersInStorage.length - 1].OrderId + 1) ,
            OrderDate:   new Date().toISOString(),
            clientName: this.newOrder.clientName,
            clientEmail: this.newOrder.clientEmail,
            clientPhone: this.newOrder.clientPhone,
            PaymentType: this.newOrder.PaymentType,
            Products: this.newOrder.products,
            UserId: +(Math.random() * 10000),
            totalPrice: +(this.ordersService.getTotalPrice(this.newOrder.products))
          }

     ordersInStorage.push(Order);
    localStorage.setItem('orders', JSON.stringify(ordersInStorage));
    this.getOrders()
    this.hideDialogAndReset();
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
