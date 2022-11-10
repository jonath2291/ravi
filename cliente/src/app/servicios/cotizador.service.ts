import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CotizadorService {

  baseURL: string = "";
  token = "";
  headers_token = {};

  constructor(
    private http: HttpClient
  ) { }
  actualizar_accesos() {
    this.baseURL = environment.apiUrl + "/cotizador/";
    this.token = JSON.parse(localStorage.getItem('accesos') || '{}').access_token;
    this.headers_token = { 'headers': { 'content-type': 'aplication/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': 'Bearer ' + this.token } };
  }
  get_cotizador() {
    this.actualizar_accesos();
    return this.http.get(this.baseURL + 'get_cotizador', this.headers_token);
  }
  post_cotizador(cotizador: any) {
    
    this.actualizar_accesos();
    const body = JSON.stringify(cotizador);
    return this.http.post(this.baseURL + 'post_cotizador', body, this.headers_token);
  }
  eliminar_cotizador(id: number) {

    this.actualizar_accesos();
    return this.http.get(this.baseURL + 'eliminar_cotizador/' + id, this.headers_token);
  }

  enviar_correo() {
    this.actualizar_accesos();
    return this.http.get(this.baseURL + 'enviar_correo', this.headers_token);
  }
}
