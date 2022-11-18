import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaProductoComponent } from './producto/lista-producto/lista-producto.component';
import { AlmacenRoutingModule } from './almacen-routing.module';//Para cambiar de interfaz.


@NgModule({
  declarations: [
    ListaProductoComponent
  ],
  imports: [
    CommonModule,
    AlmacenRoutingModule
  ]
})
export class AlmacenModule { }
