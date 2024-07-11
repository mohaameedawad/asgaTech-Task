import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';


@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    InputNumberModule
  ],
  exports: [
    HeaderComponent,
    ButtonModule,
    TableModule,
    PaginatorModule,
    FormsModule,
    InputNumberModule
  ]
})
export class SharedModule { }
