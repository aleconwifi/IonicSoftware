import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/cliente.model';
import { ClienteService } from '../../services/service.index';

import { Inmueble } from '../../models/inmueble.model';
import { InmuebleService } from '../../services/service.index';

@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styles: []
})
export class Graficas1Component implements OnInit {

   porcent: number;

  graficos: any = {
    'grafico1': {
      'labels': ['Con Frijoles', 'Con Natilla', 'Con tocino'],
      'data':  [24, 30, 46],
      'type': 'doughnut',
      'leyenda': 'Numero de Clientes'
    },
    'grafico2': {
      'labels': ['Inmuebles', 'Clientes'],
      'data':  [this._inmuebleService.totalInmuebles , this._clienteService.totalClientes],
      'type': 'doughnut',
      'leyenda': 'Numero de Inmuebles vs Clientes'
    },
    'grafico3': {
      'labels': ['Si', 'No'],
      'data':  [95, 5],
      'type': 'doughnut',
      'leyenda': 'Cantidad de usuarios admin y user'
    },
    'grafico4': {
      'labels': ['No', 'Si'],
      'data':  [85, 15],
      'type': 'doughnut',
      'leyenda': 'Cantidad de seguidores'
    },
  };

  constructor(
    public _clienteService: ClienteService,
    public _inmuebleService: InmuebleService,
  ) { }

  ngOnInit() {
  }

}
