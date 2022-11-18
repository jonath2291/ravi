

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProductoComponent } from './producto/lista-producto/lista-producto.component';




export const routes: Routes = [
  {
    path: 'lista_producto',
    component: ListaProductoComponent
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
export class AlmacenRoutingModule { }


