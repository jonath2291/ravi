import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  
  baseURL: string = "";
  token = "";
  headers_token = {};

  constructor(
    private http: HttpClient
  ) { }
  actualizar_accesos() {
    this.baseURL = environment.apiUrl + "/producto/";
    this.token = JSON.parse(localStorage.getItem('accesos') || '{}').access_token;
    this.headers_token = { 'headers': { 'content-type': 'aplication/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': 'Bearer ' + this.token } };
  }
  get_producto() {
    this.actualizar_accesos();
    return this.http.get(this.baseURL + 'get_producto', this.headers_token);
  }
}
