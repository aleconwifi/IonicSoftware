import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/cliente.model';
import { ClienteService } from '../../services/service.index';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: []
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];

  constructor(
    public _clienteService: ClienteService
  ) { }

  ngOnInit() {
    this.cargarClientes();
  }

  cargarClientes() {
    this._clienteService.cargarClientes()
          .subscribe( clientes => this.clientes = clientes );
  }

  buscarCliente( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarClientes();
      return;
    }

    this._clienteService.buscarClientes( termino )
            .subscribe( clientes =>  this.clientes = clientes );
  }

  borrarCliente( cliente: Cliente ) {

    this._clienteService.borrarCliente( cliente._id )
            .subscribe( () =>  this.cargarClientes() );

  }

}
