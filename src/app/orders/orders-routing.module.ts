import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './components/orders-component/orders.component';
import { OrderDetailsComponent } from "./components/order-details-component/order-details.component";
const routes: Routes = [
  { path: '', redirectTo : 'orders-list', pathMatch: 'full' },
  { path: 'orders-list', component: OrdersComponent },
  { path: ':id', component: OrderDetailsComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
