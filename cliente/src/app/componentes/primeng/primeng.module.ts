import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimengRoutingModule } from './primeng-routing.module';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';

import {TreeModule} from 'primeng/tree';

import {SidebarModule} from 'primeng/sidebar';
import { PanelMenuModule } from 'primeng/panelmenu';

//import { NgModule }      from '@angular/core';


//import { ProductService } from './productservice';

import {DataViewModule} from 'primeng/dataview';
import {PanelModule} from 'primeng/panel';
import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import {RatingModule} from 'primeng/rating';


import { ToastModule } from 'primeng/toast';
import { MenuModule } from 'primeng/menu';
import {TableModule} from 'primeng/table';

import { ToolbarModule } from 'primeng/toolbar';
import { TablaExportComponent } from './tabla-export/tabla-export.component';
import {PasswordModule} from 'primeng/password';
import {CardModule} from 'primeng/card';



@NgModule({
  declarations: [
    TablaExportComponent
  ],
  imports: [
    CommonModule,
    PrimengRoutingModule,
    TableModule,
    ButtonModule
  ],
  exports: [
    AccordionModule,
    ButtonModule,
    RippleModule,
    MenubarModule,
    InputTextModule,
    TreeModule,
    SidebarModule,
    PanelMenuModule,
    DataViewModule,
    PanelModule,
    DropdownModule,
    DialogModule,
    RatingModule,
    ToastModule,
    MenuModule,
    TableModule,
    ToolbarModule,
    TablaExportComponent,
    PasswordModule,
    CardModule
  ]
})
export class PrimengModule { }
