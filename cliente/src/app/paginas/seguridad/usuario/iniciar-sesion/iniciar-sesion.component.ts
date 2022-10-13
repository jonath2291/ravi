import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MessageService} from 'primeng/api';
import {UsuarioService} from '../../../../servicios/usuario.service';
import { UsuarioModelo } from '../../../../modelos/usuario-modelo';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'



@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css'],
  providers:[MessageService]
})
export class IniciarSesionComponent implements OnInit {

  activar_login: boolean = true;
  value2!: string;
  form_usuario!: FormGroup;
  usuario = '';
  contrasena='';
  mensaje='';
  

  usuario_modelo!:UsuarioModelo;

  loading=false;

  constructor(
    private primengConfig: PrimeNGConfig,
    private servicio_usuario:UsuarioService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.IniciarFormulario();
    this.VerificarSesion();
  }
  VerificarSesion(){

    if(localStorage.getItem('accesos')!=undefined){
      this.loading=false;
      this.activar_login=false; 
      this.router.navigate(['/seguridad/lista_usuario']); 
    }

  }

  IniciarFormulario(){
    this.form_usuario = new FormGroup({
      usuario: new FormControl(this.usuario, [ Validators.required, Validators.maxLength(30)]),
      contrasena: new FormControl(this.contrasena, [ Validators.required, Validators.maxLength(30)]),
    });
  }
   async MostrarLoading(){
    Swal.fire({
      title: 'Cargando...',
      html: 'Espere un momento por favor...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      }
    });
  }
  async CerrarLoading(){
    Swal.close();
  }
  MostarError(mensaje:String){
    Swal.fire({
      icon: 'error',
      title: 'Error!!',
      text: String(mensaje)
    })
  }
  async ActivarLogin(){
    this.activar_login=false; 
    console.log("Login desactivado",this.activar_login); 
  }

  async IniciarSesion(){

    this.MostrarLoading();
    
    let nuevo_usuario = new UsuarioModelo;
    nuevo_usuario.email=this.form_usuario.value.usuario;
    nuevo_usuario.password=this.form_usuario.value.contrasena;

     this.servicio_usuario.post_iniciar_sesion(nuevo_usuario).subscribe(async data=>{
       console.log("datos de usuario",data);
       await this.ActivarLogin();
       await this.CerrarLoading();
      //localStorage.removeItem("accesos");
       localStorage.setItem('accesos', JSON.stringify(data)); 
       this.router.navigate(['/seguridad/lista_usuario']); 
             
      
     },
     error=>{
         this.CerrarLoading();
         this.MostarError('Usuario y/o Contraseña incorrecta');
         console.log("ERROR ",error);
     })

  }
  CerrarSesion(){
    this.MostrarLoading();
    //  this.visible_cerrar_sesion=false;
    //  this.loading("Cerrando Sesión");
     //this.form_usuario.reset();
     this.servicio_usuario.post_cerrar_sesion().subscribe(data=>{ 
       this.activar_login=true; 
       this.CerrarLoading();
       localStorage.removeItem("accesos");
       this.router.navigate(['/shared/iniciar_sesion']);   
     },
     error=>{
     
       console.log("ver error ",error);
      //  this.activar_login=true; 
       this.CerrarLoading();
       this.MostarError('No pudimos conectarnos con el servidor');
      //  localStorage.removeItem("accesos");
       this.router.navigate(['/shared/iniciar_sesion']);   
     })


  }
  
}
