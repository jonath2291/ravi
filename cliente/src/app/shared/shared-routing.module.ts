import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IniciarSesionComponent } from '../paginas/seguridad/usuario/iniciar-sesion/iniciar-sesion.component';

const routes: Routes = [
  { 
    path: 'iniciar_sesion', 
    component: IniciarSesionComponent },
  {
    path: '**',
    redirectTo: '/shared/iniciar_sesion',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
