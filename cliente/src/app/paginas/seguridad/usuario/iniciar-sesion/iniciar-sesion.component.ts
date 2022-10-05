import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import {MenuItem} from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {

  activar_login:any;
  value2!: string;
  form_usuario!: FormGroup;
  usuario = '';
  contrasena='';

  constructor(private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.activar_login=true;
    this.IniciarFormulario();
  }
  IniciarFormulario(){
    this.form_usuario = new FormGroup({
      usuario: new FormControl(this.usuario, [ Validators.required, Validators.maxLength(30)]),
      contrasena: new FormControl(this.contrasena, [ Validators.required, Validators.maxLength(30)]),
 
    });
  }
  IniciarSesion(){
    console.log('Llego!!')
  }
  
}
