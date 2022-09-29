import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguridadRoutingModule } from './seguridad-routing.module';
// import { IniciarSesionComponent } from './usuario/iniciar-sesion/iniciar-sesion.component';


@NgModule({
  declarations: [
    // IniciarSesionComponent
  ],
  imports: [
    CommonModule,
    SeguridadRoutingModule
  ]
})
export class SeguridadModule { }
