import { Component, OnInit } from '@angular/core';
import { CotizadorModelo } from 'src/app/modelos/cotizador-modelo';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CotizadorService } from '../../../../servicios/cotizador.service';
import Swal from 'sweetalert2';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-lista-parametro',
  templateUrl: './lista-parametro.component.html',
  styleUrls: ['./lista-parametro.component.css']
})
export class ListaParametroComponent implements OnInit {


  lista_cotizador!: CotizadorModelo[];
  cotizador: CotizadorModelo = new CotizadorModelo();
  loading: boolean = true;
  form_cotizador!: FormGroup;
  submitted!: boolean;
  productDialog!: boolean;

  constructor(
    private cotizador_servicio: CotizadorService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.IniciarFormulario();
    this.ListarCotizador();
  }

  
  async MostrarLoading() {
    Swal.fire({
      title: 'Cargando...',
      html: 'Espere un momento por favor...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }
  async CerrarLoading() {
    Swal.close();
  }

  IniciarFormulario() {
    this.form_cotizador = new FormGroup({
      id_parametro: new FormControl(this.cotizador.id_parametro),
      codigo: new FormControl(this.cotizador.codigo),
      parametro: new FormControl(this.cotizador.parametro),
      valor_parametro: new FormControl(this.cotizador.valor_parametro),

    });
  }
  

  ListarCotizador() {
    this.loading = true;
    this.cotizador_servicio.get_cotizador().subscribe(
      (data) => {
        console.log("ver  res ",data);
        
        this.loading = false;
        this.lista_cotizador = JSON.parse(JSON.stringify(data)).lista_cotizador;
      },
      (error) => {
        this.loading = false;
        console.log('ERROR ', error);
        this.MostarError('Revise su conexión a internet');
      }
    );
  }

  openNew() {
    this.cotizador = new CotizadorModelo();
    this.submitted = false;
    this.productDialog = true;
  }


  EditarCotizador(cotizador: CotizadorModelo) {
    this.cotizador = { ...cotizador };
    this.openNew();
    console.log(cotizador);

    this.form_cotizador.controls['id_parametro'].setValue(cotizador.id_parametro);
    this.form_cotizador.controls['codigo'].setValue(cotizador.codigo);
    this.form_cotizador.controls['parametro'].setValue(cotizador.parametro);
    this.form_cotizador.controls['valor_parametro'].setValue(cotizador.valor_parametro);
  }


  EliminarCotizador(id_parametro: Number){
    this.confirmationService.confirm({
      message: '¿Esta seguro(a) de eliminar?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.MostrarLoading();
        this.cotizador_servicio
          .eliminar_cotizador(Number(id_parametro))
          .subscribe(
            async (data) => {
              await this.CerrarLoading();
              this.messageService.add({
                severity: 'success',
                summary: 'Exito',
                detail: 'Parametro Eliminado',
                life: 3000,
              });

              this.ListarCotizador();
            },
            (error) => {
              this.CerrarLoading();
              this.MostarError('Revise su conexión a internet');
              console.log('ERROR ', error);
            }
          );
      },
    });

  }

  GuardarCotizador(){

    this.MostrarLoading();
    let nuevo_cotizador = new CotizadorModelo();
    nuevo_cotizador.id_parametro = this.form_cotizador.value.id_parametro;
    nuevo_cotizador.codigo = this.form_cotizador.value.codigo;
    nuevo_cotizador.parametro = this.form_cotizador.value.parametro;
    nuevo_cotizador.valor_parametro = this.form_cotizador.value.valor_parametro;
    this.cotizador_servicio.post_cotizador(nuevo_cotizador).subscribe(
      async (data) => {
        this.form_cotizador.reset();
        await this.CerrarLoading();
        this.messageService.add({
          severity: 'success',
          summary: 'Exito',
          detail: 'Parametro Guardado',
          life: 3000,
        });

        this.ListarCotizador();
      },
      (error) => {
        this.CerrarLoading();
        this.MostarError('Revise su conexión a internet');
        console.log('ERROR ', error);
      }
    );

    console.log(nuevo_cotizador);
    this.productDialog = false;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  MostarError(mensaje: String) {
    Swal.fire({
      icon: 'error',
      title: 'Error!!',
      text: String(mensaje),
    });
  }

  EnviarCorreo(){
    this.MostrarLoading();
    this.cotizador_servicio.enviar_correo().subscribe(
      async (data) => {
        console.log('res ',data);
        this.form_cotizador.reset();
        await this.CerrarLoading();
        this.messageService.add({
          severity: 'success',
          summary: 'Exito',
          detail: 'Correo Enviado',
          life: 3000,
        });

        this.ListarCotizador();
      },
      (error) => {
        this.CerrarLoading();
        this.MostarError('Revise su conexión a internet');
        console.log('ERROR ', error);
      }
    );
  }
}
