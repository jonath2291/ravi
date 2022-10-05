import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguridadRoutingModule } from './seguridad-routing.module';
import { ListaUsuarioComponent } from './usuario/lista-usuario/lista-usuario.component';
// import { IniciarSesionComponent } from './usuario/iniciar-sesion/iniciar-sesion.component';
import { PrimengModule } from '../../componentes/primeng/primeng.module';

import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    // IniciarSesionComponent
  
    ListaUsuarioComponent
  ],
  imports: [
    CommonModule,
    SeguridadRoutingModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SeguridadModule { }
