import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PersonaModelo } from 'src/app/modelos/persona-modelo';
import { PersonaService } from '../../../../servicios/persona.service';
import { Table } from 'primeng/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { PdfComponent } from '../../../../componentes/pdf/pdf.component';

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-lista-persona',
  templateUrl: './lista-persona.component.html',
  styleUrls: ['./lista-persona.component.css'],
  providers: [PdfComponent],
})
export class ListaPersonaComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;

  lista_persona!: PersonaModelo[];
  persona: PersonaModelo = new PersonaModelo();
  submitted!: boolean;
  statuses!: any[];
  productDialog!: boolean;
  icono_alert: string = '';
  form_usuario!: FormGroup;

  seleccionarPersona!: PersonaModelo[];
  loading: boolean = true;

  constructor(
    private persona_servicio: PersonaService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private servicio_pdf: PdfComponent
  ) {}

  ngOnInit() {
    this.IniciarFormulario();
    this.ListarPersonas();

    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' },
    ];
  }

  IniciarFormulario() {
    this.form_usuario = new FormGroup({
      id_persona: new FormControl(this.persona.id_persona),
      nombre: new FormControl(this.persona.nombre, [
        Validators.required,
        Validators.maxLength(30),
      ]),
      apellido_paterno: new FormControl(this.persona.apellido_paterno, [
        Validators.required,
        Validators.maxLength(30),
      ]),
      apellido_materno: new FormControl(this.persona.apellido_materno, [
        Validators.required,
        Validators.maxLength(30),
      ]),
      ci: new FormControl(this.persona.ci, [
        Validators.required,
        Validators.maxLength(15),
      ]),
      celular: new FormControl(this.persona.celular, [
        Validators.required,
        Validators.maxLength(15),
      ]),
    });
  }
  ListarPersonas() {
    this.loading = true;
    this.persona_servicio.get_personas().subscribe(
      (data) => {
        this.loading = false;
        this.lista_persona = JSON.parse(JSON.stringify(data)).lista_personas;
      },
      (error) => {
        this.loading = false;
        console.log('ERROR ', error);
        this.MostarError('Revise su conexión a internet');
      }
    );
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
  MostarError(mensaje: String) {
    Swal.fire({
      icon: 'error',
      title: 'Error!!',
      text: String(mensaje),
    });
  }
  openNew() {
    this.persona = new PersonaModelo();
    this.submitted = false;
    this.productDialog = true;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  deleteSelectedProducts() {}

  saveProduct() {
    this.MostrarLoading();
    let nuevo_persona = new PersonaModelo();
    nuevo_persona.id_persona = this.form_usuario.value.id_persona;
    nuevo_persona.nombre = this.form_usuario.value.nombre;
    nuevo_persona.apellido_paterno = this.form_usuario.value.apellido_paterno;
    nuevo_persona.apellido_materno = this.form_usuario.value.apellido_materno;
    nuevo_persona.ci = this.form_usuario.value.ci;
    nuevo_persona.celular = this.form_usuario.value.celular;

    this.persona_servicio.post_personas(nuevo_persona).subscribe(
      async (data) => {
        this.form_usuario.reset();
        await this.CerrarLoading();
        this.messageService.add({
          severity: 'success',
          summary: 'Exito',
          detail: 'Persona Creado',
          life: 3000,
        });

        this.ListarPersonas();
      },
      (error) => {
        this.CerrarLoading();
        this.MostarError('Revise su conexión a internet');
        console.log('ERROR ', error);
      }
    );

    this.productDialog = false;
  }

  editProduct(persona: PersonaModelo) {
    this.persona = { ...persona };
    this.openNew();

    this.form_usuario.controls['id_persona'].setValue(persona.id_persona);
    this.form_usuario.controls['nombre'].setValue(persona.nombre);
    this.form_usuario.controls['apellido_paterno'].setValue(
      persona.apellido_paterno
    );
    this.form_usuario.controls['apellido_materno'].setValue(
      persona.apellido_materno
    );
    this.form_usuario.controls['ci'].setValue(persona.ci);
    this.form_usuario.controls['celular'].setValue(persona.celular);
  }

  EnviarPersona(persona: PersonaModelo) {
    this.persona_servicio.post_personas(persona).subscribe(
      async (data) => {
        await this.CerrarLoading();
        this.messageService.add({
          severity: 'success',
          summary: 'Exito',
          detail: 'Persona Modificado',
          life: 3000,
        });

        this.ListarPersonas();
      },
      (error) => {
        this.CerrarLoading();
        this.MostarError('Revise su conexión a internet');
        console.log('ERROR ', error);
      }
    );

    this.productDialog = false;
  }

  eliminarPersona(persona: PersonaModelo) {
    this.confirmationService.confirm({
      message: '¿Esta seguro(a) de eliminar?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.MostrarLoading();
        this.persona_servicio
          .eliminar_personas(Number(persona.id_persona))
          .subscribe(
            async (data) => {
              await this.CerrarLoading();
              this.messageService.add({
                severity: 'success',
                summary: 'Exito',
                detail: 'Persona Modificado',
                life: 3000,
              });

              this.ListarPersonas();
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

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  exportCSV() {}
  // exportExcel() {
  //   import("xlsx").then(xlsx => {
  //     const worksheet = xlsx.utils.json_to_sheet(  this.lista_persona   );
  //     const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
  //     const excelBuffer: any = xlsx.write(workbook, {
  //       bookType: "xlsx",
  //       type: "array"
  //     });
  //     this.saveAsExcelFile(excelBuffer, "ListarPersonas");
  //   });
  // }

  // saveAsExcelFile(buffer: any, fileName: string): void {
  //   import("file-saver").then(FileSaver => {
  //     let EXCEL_TYPE =
  //       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  //     let EXCEL_EXTENSION = ".xlsx";
  //     const data: Blob = new Blob([buffer], {
  //       type: EXCEL_TYPE
  //     });
  //     FileSaver.saveAs(
  //       data,
  //       fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
  //     );
  //   });
  // }
  

  export(type_export:String) {

    let parametros_pdf = [
      {
        titulo: 'Lista Persona',
        header: [
          {
            name:'id_persona',
            value: 'Id persona',
            hidden: true,
            type:'Number'
          },
          {
            name:'nombre',
            value: 'Nombre',
            hidden: false,
            type:'String'
          },
          {
            name:'apellido_paterno',
            value: 'Apellido Paterno',
            hidden: false,
            type:'String'
          },
          {
            name:'apellido_materno',
            value: 'Apellido Materno',
            hidden: false,
            type:'String'
          },
          {
            name:'ci',
            value: 'Cedula de Identidad',
            hidden: false,
            type:'String'
          },
          {
            name:'celular',
            value: 'Celular',
            hidden: false,
            type:'String'
          },
        ],

       data: this.lista_persona,
       type_export:type_export
      },
    ];

    this.servicio_pdf.export(parametros_pdf);
  }
}
