import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; //Navegación propio de angular
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; //Navegación animado propio de angular

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';// Para servicios, conectarse con el backend
import { AppRoutingModule } from './app-routing.module';//Para cambiar de interfaz.
import { SharedModule } from './shared/shared.module'; //Los componentes publicos
import { HashLocationStrategy, LocationStrategy } from '@angular/common'; //Para refrescar en producción

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
