import { getLocaleDayPeriods } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { arrow } from '@popperjs/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';


@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {

  header=new Array();
  data=new Array();
  valores_final=Array();
  constructor() { }

  ngOnInit(): void {
  }

  downloadPDF() {
    const head = this.header; 
    const data = this.valores_final;

    
    
    const doc = new jsPDF()
    doc.text('Lista de Usuarios', 14, 10);
    autoTable(doc, {
      showHead: 'everyPage',
      theme: 'grid',
      head: head,
      body: data,
      didDrawCell: (data) => {

      },
    })
    
    doc.save('table.pdf')
  }
  
  GetHeader(lista_header:any){

    let header = '[';
    let aheader=Array();
    for (let y = 0; y < lista_header.length; y++) {
        if(lista_header[y].hidden==false){

          aheader.push(lista_header[y].value);
        
        }

      
    }

    this.header = [aheader] ;
    

  };

  export(parametro:any){

    if(parametro[0].type_export=='pdf'){
      this.ExportarPdf(parametro);
    }
    if(parametro[0].type_export=='xlsx'){
      this.exportAsExcel(parametro);
    }
  
  
  }

  ExportarPdf(parametro:any){
    
    
    let obj = {
      name: 'juan',
      profesion: 'petera'

    }
    
    let lista_header=parametro[0].header;

    this.GetHeader(lista_header);

    let lista_data = parametro[0].data; 

    let valores = '';
   
    for (let i = 0; i < lista_data.length; i++) {

     
       
          let fila = Object.keys([lista_data[i]].reduce((o,c) => Object.assign(o,c)));
          let fila_valor = Object.values([lista_data[i]].reduce((o,c) => Object.assign(o,c)));

          let fila_tipo = Object([lista_data[i]].reduce((o,c) => Object.assign(o,c)));

            valores ='';
            for (let y = 0; y < lista_header.length; y++) {

              for (let x = 0; x < fila.length; x++) {
                if(lista_header[y].name == fila[x] && lista_header[y].hidden==false ){

                  if(fila_tipo[x]){
                    
                  }
                  valores+= fila_valor[x]+",";
                }
              }
            }

            valores+=']';
           
            valores=valores.replace(",]","");

            let aux = valores.split(',');
            this.valores_final.push(  JSON.parse(JSON.stringify( aux))  );

    }
   

    this.downloadPDF();
    
  }
  





   exportAsExcel(parametro:any) {
     this.exportAsExcelFile(parametro, 'lista_personas');
   }
  exportAsExcelFile(param: any[], excelFileName: string): void {

    let json=param[0].data;
    let parametro =param;

    console.log("json descrip",param);


///////////////////////////////////////
let lista_header=parametro[0].header;

this.GetHeader(lista_header);

let lista_data = parametro[0].data; 
console.log("www",lista_data);


let valores :any;

for (let i = 0; i < lista_data.length; i++) {

 
   
      let fila = Object.keys([lista_data[i]].reduce((o,c) => Object.assign(o,c)));
      let fila_valor = Object.values([lista_data[i]].reduce((o,c) => Object.assign(o,c)));

      let fila_tipo = Object([lista_data[i]].reduce((o,c) => Object.assign(o,c)));

        valores ='{';
        for (let y = 0; y < lista_header.length; y++) {

          for (let x = 0; x < fila.length; x++) {
            if(lista_header[y].name == fila[x] && lista_header[y].hidden==false ){

              if(fila_tipo[x]){
                
              }
              valores+= '"'+lista_header[y].value+'":"'+fila_valor[x]+'",';
            }
          }
        }

        valores+='}';
       
        valores=valores.replace('",}','"}');

        var jsonTexto = '{"color":"blanco","km":100000,"esNuevo":false}';
        console.log('obj_correcto', jsonTexto);
        console.log('obj_nuestro', valores);

        console.log('valores xx' , valores);
        let arr = JSON.parse( valores);
        console.log(" ffffff ",arr);

         let aux = valores.split(',');
        this.valores_final.push( arr );
        console.log("xxxxx ",  this.valores_final );
        
        

}
///////////////////////////////////////7


     const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.valores_final);
     console.log('worksheet', worksheet);



     const workbook: XLSX.WorkBook = {
       Sheets: { data: worksheet },
       SheetNames: ['data'],
     };
     const excelBuffer: any = XLSX.write(workbook, {
       bookType: 'xlsx',
       type: 'array',
     });
     //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
     this.saveAsExcelFile(excelBuffer, excelFileName);
   }
  saveAsExcelFile(buffer: any, fileName: string): void {
     const data: Blob = new Blob([buffer], {
       type: EXCEL_TYPE,
     });
     FileSaver.saveAs(
       data,
       fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
     );
   }

}
