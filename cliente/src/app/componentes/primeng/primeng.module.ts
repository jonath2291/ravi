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



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PrimengRoutingModule,
  ],
  exports: [
    AccordionModule,
    ButtonModule,
    RippleModule,
    MenubarModule,
    InputTextModule,
    TreeModule,
    SidebarModule,
    PanelMenuModule
  ]
})
export class PrimengModule { }
