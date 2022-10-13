import { Component, Input, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css'],
  providers: [MessageService]

})
export class AlertasComponent implements OnInit {

  @Input() mensaje: string=""; 


  constructor(private messageService: MessageService, private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  exito(mensaje:string) {
    this.messageService.add({severity:'success', summary: 'Success', detail: mensaje});
  }

}

