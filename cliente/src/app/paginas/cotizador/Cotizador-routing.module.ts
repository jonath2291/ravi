

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaParametroComponent } from './parametros/lista-parametro/lista-parametro.component';



export const routes: Routes = [
  {
    path: 'lista_parametro',
    component: ListaParametroComponent
  },

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
export class CotizadorRoutingModule { }


