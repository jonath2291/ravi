import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { IniciarSesionComponent } from './usuario/iniciar-sesion/iniciar-sesion.component';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
