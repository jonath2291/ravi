import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaParametroComponent } from './parametros/lista-parametro/lista-parametro.component';
import { CotizadorRoutingModule } from './Cotizador-routing.module';//Para cambiar de interfaz.
import { PrimengModule } from '../../componentes/primeng/primeng.module';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    ListaParametroComponent
  ],
  imports: [
    CotizadorRoutingModule,
    CommonModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CotizadorModule { }
