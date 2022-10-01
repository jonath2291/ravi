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
  columnas!: any[];

  constructor(private servicio_usuario :UsuarioService ) { }

  ngOnInit(): void {
    this.IniciarValores();
  }
  
  IniciarValores(){
        this.servicio_usuario.getProductsSmall().then(data => (
          this.products = data
          ));

        this.columnas = [
          { field: "code", header: "Codigo" },
          { field: "name", header: "Nombre" },
          { field: "category", header: "Categoria" },
          { field: "quantity", header: "Cantidad" }
        ];
    
     
  }

}

