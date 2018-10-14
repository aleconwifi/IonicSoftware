import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styles: []
})
export class SolicitudComponent implements OnInit {
  @Input() usuario : any;
  mostrarDatos: boolean=false;

  contructor() { }

  ngOnInit() {
  }

  activar(): void {
    this.mostrarDatos = true;
    }

}
