import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'shared',
    loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule)
  },
  {
    path: 'seguridad',
    loadChildren: () => import('./paginas/seguridad/seguridad.module').then(m => m.SeguridadModule)
  },
  {
    path: 'cotizador',
    loadChildren: () => import('./paginas/cotizador/cotizador.module').then(m => m.CotizadorModule)
  },
  {
    path: 'almacen',
    loadChildren: () => import('./paginas/almacen/almacen.module').then(m => m.AlmacenModule)
  },
  {
    path: '**',
    redirectTo: '/shared/iniciar_sesion',
    pathMatch: 'full'
  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
