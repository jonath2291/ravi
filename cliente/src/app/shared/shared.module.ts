import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { IniciarSesionComponent } from '../paginas/seguridad/usuario/iniciar-sesion/iniciar-sesion.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PrimengModule } from '../componentes/primeng/primeng.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NodeService } from './sidebar/nodeservice';


@NgModule({
  declarations: [
    IniciarSesionComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    PrimengModule
  ],
  exports:[
    IniciarSesionComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  providers: [NodeService]

})
export class SharedModule { }
