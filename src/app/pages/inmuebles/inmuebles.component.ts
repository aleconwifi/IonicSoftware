import { Component, OnInit } from '@angular/core';
import { Inmueble } from '../../models/inmueble.model';
import { InmuebleService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';


declare var swal: any;

@Component({
  selector: 'app-inmuebles',
  templateUrl: './inmuebles.component.html',
  styles: []
})
export class InmueblesComponent implements OnInit {

  inmuebles: Inmueble[] = [];

  constructor(
    public _inmuebleService: InmuebleService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarInmuebles();

    this._modalUploadService.notificacion
          .subscribe( () => this.cargarInmuebles() );
  }

  buscarInmueble( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarInmuebles();
      return;
    }

    this._inmuebleService.buscarInmueble( termino )
            .subscribe( inmuebles => this.inmuebles = inmuebles );

  }

  cargarInmuebles() {
    this._inmuebleService.cargarInmuebles()
            .subscribe( inmuebles => this.inmuebles = inmuebles );
  }


  guardarInmueble( inmueble: Inmueble) {

    this._inmuebleService.actualizarInmueble( inmueble )
            .subscribe();

  }

  borrarInmueble( inmueble: Inmueble ) {

    this._inmuebleService.borrarInmueble( inmueble._id )
            .subscribe( () =>  this.cargarInmuebles() );

  }

  crearInmueble() {

    swal({
      title: 'Crear inmueble',
      text: 'Ingrese el nombre del inmueble',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then( (valor: string ) => {

      if ( !valor || valor.length === 0 ) {
        return;
      }

      this._inmuebleService.crearInmueble( valor )
              .subscribe( () => this.cargarInmuebles() );

    });

  }

  actualizarImagen( inmueble: Inmueble ) {

    this._modalUploadService.mostrarModal( 'inmuebles', inmueble._id );

  }

}
