import { Component, OnInit } from '@angular/core';
import {MenuItem, MessageService, TreeNode} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';
import { IniciarSesionComponent } from 'src/app/paginas/seguridad/usuario/iniciar-sesion/iniciar-sesion.component';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers:[IniciarSesionComponent, MessageService]
})
export class SidebarComponent implements OnInit {
  items!: MenuItem[];
  mostrar_sidebar: any;
  files!: TreeNode[];
  selectedFile!: TreeNode;


  constructor(
    private iniciar_sesion: IniciarSesionComponent,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.IniciarMenu();
   
  }
  CerrarSesion(){
    console.log('LLego componente cerrar sesion sidebar');
    this.iniciar_sesion.CerrarSesion();
  }
  IniciarMenu(){
    
      this.items = [
          {
          label: 'File',
          icon:'pi pi-fw pi-file',
          items: [
              {
                  label: 'New',
                  icon:'pi pi-fw pi-plus',
                  items: [
                      {
                      label: 'Bookmark',
                      icon:'pi pi-fw pi-bookmark'
                      },
                      {
                      label: 'Video',
                      icon:'pi pi-fw pi-video'
                      }
                  ]
              },
              {
                  label: 'Delete',
                  icon:'pi pi-fw pi-trash'
              },
              {
                  label: 'Export',
                  icon:'pi pi-fw pi-external-link'
              }
          ]
          },
          {
          label: 'Edit',
          icon:'pi pi-fw pi-pencil',
          items: [
              {
                  label: 'Left',
                  icon:'pi pi-fw pi-align-left'
              },
              {
                  label: 'Right',
                  icon:'pi pi-fw pi-align-right'
              },
              {
                  label: 'Center',
                  icon:'pi pi-fw pi-align-center'
              },
              {
                  label: 'Justify',
                  icon:'pi pi-fw pi-align-justify'
              }
          ]
          },
          {
          label: 'Users',
          icon:'pi pi-fw pi-user',
          items: [
              {
                  label: 'New',
                  icon:'pi pi-fw pi-user-plus',

              },
              {
                  label: 'Delete',
                  icon:'pi pi-fw pi-user-minus',
              },
              {
                  label: 'Search',
                  icon:'pi pi-fw pi-users',
                  items: [
                      {
                      label: 'Filter',
                      icon:'pi pi-fw pi-filter',
                      items: [
                          {
                              label: 'Print',
                              icon:'pi pi-fw pi-print'
                          }
                      ]
                      },
                      {
                      icon:'pi pi-fw pi-bars',
                      label: 'List'
                      }
                  ]
              }
          ]
          },
          {
          label: 'Events',
          icon:'pi pi-fw pi-calendar',
          items: [
              {
                  label: 'Edit',
                  icon:'pi pi-fw pi-pencil',
                  items: [
                      {
                      label: 'Save',
                      icon:'pi pi-fw pi-calendar-plus'
                      },
                      {
                      label: 'Delete',
                      icon:'pi pi-fw pi-calendar-minus'
                      }
                  ]
              },
              {
                  label: 'Archieve',
                  icon:'pi pi-fw pi-calendar-times',
                  items: [
                      {
                      label: 'Remove',
                      icon:'pi pi-fw pi-calendar-minus'
                      }
                  ]
              }
          ]
          }
      ];
  }

  AbrirSideBar(){
    if(localStorage.getItem('accesos') == undefined ){
      //this.messageService.add({severity: 'info', summary: 'Mensaje', detail: 'Iniciar sesión' });

      this.mostrar_sidebar=false;

    }else{
      let menu_aux=JSON.parse(localStorage.getItem('accesos')|| '{}').accesos.original.replaceAll('expandedicon','expandedIcon');
      menu_aux=menu_aux.replaceAll('collapsedicon','collapsedIcon');
      menu_aux=menu_aux.replaceAll('items','children');
      menu_aux=menu_aux.replaceAll('ruta_menu_sidebar','routerLink');
      this.files=JSON.parse(menu_aux).children;
      this.mostrar_sidebar=true;
      //this.expandAll();
    } 
    
  }

  expandAll(){
    this.files.forEach( node => {
        this.expandRecursive(node, true);
    } );
  }

  collapseAll(){
      this.files.forEach( node => {
          this.expandRecursive(node, false);
      } );
  }

  private expandRecursive(node:TreeNode, isExpand:boolean){
      node.expanded = isExpand;
      if (node.children){
          node.children.forEach( childNode => {
              this.expandRecursive(childNode, isExpand);
          } );
      }
  }

  nodeSelect(event: { node: { label: any,routerLink:any; }; }) {

  
    if(event.node.routerLink){
      this.router.navigate([event.node.routerLink]);  
    } 
    // this.messageService.add({severity: 'info', summary: 'Node Selected', detail: event.node.label});
  }

  nodeUnselect(event: { node: { label: any; }; }) {
      // this.messageService.add({severity: 'info', summary: 'Node Unselected', detail: event.node.label});  
  }
}
