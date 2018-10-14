import { Component, OnInit } from '@angular/core';
import { Inmueble } from '../../models/inmueble.model';
import { InmuebleService } from '../../services/service.index';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  inmuebles: Inmueble[] = [];

  constructor( public _inmuebleService: InmuebleService,) { }

  ngOnInit() {
    this.cargarInmuebles();
  }

  cargarInmuebles() {
    this._inmuebleService.cargarInmuebles()
            .subscribe( inmuebles => this.inmuebles = inmuebles );
  }

}
