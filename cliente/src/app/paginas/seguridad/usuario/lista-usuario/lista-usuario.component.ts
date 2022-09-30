import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/modelos/usuario-modelo';
import { UsuarioService } from "../../../../servicios/usuario.service";
// import * as FileSaver from 'file-saver';



@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.css']
})
export class ListaUsuarioComponent implements OnInit {
  products!: Usuario[];

  selectedProducts!: Usuario[];

  cols!: any[];

  exportColumns!: any[];

  constructor(private servicio_usuario :UsuarioService ) { }

  ngOnInit(): void {
    this.IniciarValores();

  }
  
  IniciarValores(){
        this.servicio_usuario.getProductsSmall().then(data => (
          this.products = data
          ));

        this.cols = [
          { field: "code", header: "Code" },
          { field: "name", header: "Name" },
          { field: "category", header: "Category" },
          { field: "quantity", header: "Quantity" }
        ];
    
        this.exportColumns = this.cols.map(col => ({
          title: col.header,
          dataKey: col.field
        }));
        

  
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

