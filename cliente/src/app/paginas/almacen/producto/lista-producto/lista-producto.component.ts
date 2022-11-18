import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../../servicios/producto.service';

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.css']
})
export class ListaProductoComponent implements OnInit {

  lista_producto:any=[];
  agrupador=new Array();

  ejemplo = [
    {
      "data":
      [
          {
              "data":{
                  "name":"Documents",
                  "size":"75kb",
                  "type":"Folder"
              },
              "children":[
                  {
                      "data":{
                          "name":"Work",
                          "size":"55kb",
                          "type":"Folder"
                      },
                      "children":[
                          {
                              "data":{
                                  "name":"Expenses.doc",
                                  "size":"30kb",
                                  "type":"Document"
                              }
                          },
                          {
                              "data":{
                                  "name":"Resume.doc",
                                  "size":"25kb",
                                  "type":"Resume"
                              }
                          }
                      ]
                  },
                  {
                      "data":{
                          "name":"Home",
                          "size":"20kb",
                          "type":"Folder"
                      },
                      "children":[
                          {
                              "data":{
                                  "name":"Invoices",
                                  "size":"20kb",
                                  "type":"Text"
                              }
                          }
                      ]
                  }
              ]
          },
          {
              "data":{
                  "name":"Pictures",
                  "size":"150kb",
                  "type":"Folder"
              },
              "children":[
                  {
                      "data":{
                          "name":"barcelona.jpg",
                          "size":"90kb",
                          "type":"Picture"
                      }
                  },
                  {
                      "data":{
                          "name":"primeui.png",
                          "size":"30kb",
                          "type":"Picture"
                      }
                  },
                  {
                      "data":{
                          "name":"optimus.jpg",
                          "size":"30kb",
                          "type":"Picture"
                      }
                  }
              ]
          }
      ]
  }
  ];

  

  constructor(
    private producto_servicio: ProductoService
  ) { }
  
  ngOnInit(): void {
    this.GetProducto ();

  }


  GetProducto(){
    //this.loading = true;
    this.producto_servicio.get_producto().subscribe(
      (data) => {
        console.log("ver  producto ",JSON.parse(JSON.stringify(data)).lista_producto);

        console.log("ver  producto2 ",JSON.stringify(JSON.parse(JSON.stringify(data)).lista_producto));

        this.lista_producto = JSON.parse(JSON.stringify(data)).lista_producto;

        this.agrupador.push([{data}]);
        let max_nivel=this.lista_producto[0].nivel_max;
        let id_padre=0;
        let id_padre_aux=0;
        console.log("maximo nvel ",max_nivel);
        
        for (let index = 0; index < this.lista_producto.length; index++) {
          
          id_padre=this.lista_producto[index].id_producto_padre;

          if(this.lista_producto[index].lvl==max_nivel && id_padre == this.lista_producto[index].id_producto_padre){
      
            //console.log("ver res ",this.lista_producto[index].nombre_producto);
            id_padre_aux=this.lista_producto[index].id_producto_padre;
            let aux=this.lista_producto[index];
            this.agrupador.push(
                                {
                                  data:[{
                                  id_producto: aux.id_producto, 
                                  id_producto_padre: aux.id_producto_padre,
                                  nombre_producto: aux.nombre_producto, 
                                  codigo_simec: aux.codigo_simec, 
                                  codigo_delta: aux.codigo_delta
                                  }],
                                  children:[{
                                    id_producto: aux.id_producto, 
                                    id_producto_padre: aux.id_producto_padre,
                                    nombre_producto: aux.nombre_producto, 
                                    codigo_simec: aux.codigo_simec, 
                                    codigo_delta: aux.codigo_delta
                                    }],
                                }
                                );
          }else{

          }
          
        }

        console.log("ver tree ",this.agrupador);
        console.log("ver tree ejemplo",this.ejemplo);
        
        
        //this.loading = false;
        //this.lista_cotizador = JSON.parse(JSON.stringify(data)).lista_cotizador;
      },
      (error) => {
        //this.loading = false;
        console.log('ERROR ', error);
        //this.MostarError('Revise su conexión a internet');
      }
    );
  }





}
