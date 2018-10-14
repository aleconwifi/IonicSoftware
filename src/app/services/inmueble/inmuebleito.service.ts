import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Cliente } from '../../models/cliente.model';
import { Inmueble } from '../../models/inmueble.model';

import swal from 'sweetalert';

@Injectable()
export class InmuebleitoService {

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

  cargarInmueble( id: string ) {

    let url = URL_SERVICIOS + '/inmueble/' + id;

    return this.http.get( url )
              .map( (resp: any) => resp.inmueble );

  }

  buscarInmuebles( termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/inmuebles/' + termino;
    return this.http.get( url )
                .map( (resp: any) => resp.inmuebles );

  }

  borrarInmueble( id: string ) {

    let url = URL_SERVICIOS + '/inmueble/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
              .map( resp => {
                swal( 'Inmueble Borrado', 'Inmueble borrado correctamente', 'success' );
                return resp;
              });

  }

  guardarInmueble( inmueble: Inmueble ) {

    let url = URL_SERVICIOS + '/inmueble';

    if ( inmueble._id ) {
      // actualizando
      url += '/' + inmueble._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, inmueble )
                .map( (resp: any) => {
                  swal('Inmueble Actualizado', inmueble.nombre, 'success');
                  return resp.inmueble;

                });

    }else {
      // creando
      url += '?token=' + this._usuarioService.token;
      return this.http.post( url, inmueble )
              .map( (resp: any) => {
                swal('Inmueble Creado', inmueble.nombre, 'success');
                return resp.inmueble;
              });
    }




  }

}
