import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Inmueble } from '../../models/inmueble.model';

import swal from 'sweetalert';

@Injectable()
export class InmuebleService {

  totalInmuebles: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarInmuebles() {

    let url = URL_SERVICIOS + '/inmueble';
    return this.http.get( url )
              .map( (resp: any) => {
                this.totalInmuebles = resp.total;
                return resp.inmuebles;
              });

  }

  obtenerInmueble( id: string ) {

    let url = URL_SERVICIOS + '/inmueble/' + id;
    return this.http.get( url )
                .map( (resp: any) => resp.inmueble );

  }

  borrarInmueble( id: string ) {

    let url = URL_SERVICIOS + '/inmueble/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
                .map( resp => swal('Inmueble Borrado', 'Eliminado correctamente', 'success') );

  }

  crearInmueble( nombre: string ) {

    let url = URL_SERVICIOS + '/inmueble';
    url += '?token=' + this._usuarioService.token;

    return this.http.post( url, { nombre } )
              .map( (resp: any) => resp.inmueble );

  }

  buscarInmueble( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/inmuebles/' + termino;
    return this.http.get( url )
                .map( (resp: any) => resp.inmuebles );

  }

  actualizarInmueble( inmueble: Inmueble ) {

    let url = URL_SERVICIOS + '/inmueble/' + inmueble._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put( url, inmueble )
              .map( (resp: any) => {

                swal('Inmueble Actualiado', inmueble.nombre, 'success');
                return resp.inmueble;
              });

  }

}
