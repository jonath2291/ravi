import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/app/modelos/usuario-modelo';
// import { UsuarioService } from "../../../servicios/usuario.service";

@Component({
  selector: 'app-tabla-export',
  templateUrl: './tabla-export.component.html',
  styleUrls: ['./tabla-export.component.css']
})
export class TablaExportComponent implements OnInit {

  @Input() lista!: Usuario[];

  @Input() selectedProducts!: Usuario[];

  @Input() cols!: any[];


  constructor() { }

  ngOnInit(): void {
    this.IniciarValores();
  }
  

    IniciarValores(){
      // this.servicio_usuario.getProductsSmall().then(data => (
      //   this.lista = data
      //   ));

      // this.cols = [
      //   { field: "code", header: "Code" },
      //   { field: "name", header: "Name" },
      //   { field: "category", header: "Category" },
      //   { field: "quantity", header: "Quantity" }
      // ];

      // this.exportColumns = this.cols.map(col => ({
      //   title: col.header,
      //   dataKey: col.field
      // }));
      


  }

  exportExcel() {
      // import("xlsx").then(xlsx => {
      //     const worksheet = xlsx.utils.json_to_sheet(this.products);
      //     const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      //     const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      //     this.saveAsExcelFile(excelBuffer, "products");
      // });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
      // let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      // let EXCEL_EXTENSION = '.xlsx';
      // const data: Blob = new Blob([buffer], {
      //     type: EXCEL_TYPE
      // });
      // FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}
