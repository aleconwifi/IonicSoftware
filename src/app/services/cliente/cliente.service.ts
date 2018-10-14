import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Cliente } from '../../models/cliente.model';

import swal from 'sweetalert';

@Injectable()
export class ClienteService {

  totalClientes: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarClientes() {

    let url = URL_SERVICIOS + '/cliente';

    return this.http.get( url )
              .map( (resp: any) => {

                this.totalClientes = resp.total;
                return resp.clientes;
              });

  }

  cargarCliente( id: string ) {

    let url = URL_SERVICIOS + '/cliente/' + id;

    return this.http.get( url )
              .map( (resp: any) => resp.cliente );

  }

  buscarClientes( termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/clientes/' + termino;
    return this.http.get( url )
                .map( (resp: any) => resp.clientes );

  }

  borrarCliente( id: string ) {

    let url = URL_SERVICIOS + '/cliente/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
              .map( resp => {
                swal( 'Cliente Borrado', 'Cliente borrado correctamente', 'success' );
                return resp;
              });

  }

  guardarCliente( cliente: Cliente ) {

    let url = URL_SERVICIOS + '/cliente';

    if ( cliente._id ) {
      // actualizando
      url += '/' + cliente._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, cliente )
                .map( (resp: any) => {
                  swal('Cliente Actualizado', cliente.nombre, 'success');
                  return resp.cliente;

                });

    }else {
      // creando
      url += '?token=' + this._usuarioService.token;
      return this.http.post( url, cliente )
              .map( (resp: any) => {
                swal('Cliente Creado', cliente.nombre, 'success');
                return resp.cliente;
              });
    }




  }

}
