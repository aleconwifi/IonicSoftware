import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/cliente.model';
import { ClienteService } from '../../services/service.index';
import { NgForm } from '@angular/forms';
import { Inmueble } from '../../models/inmueble.model';
import { InmuebleService } from '../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styles: []
})
export class ClienteComponent implements OnInit {

  inmuebles: Inmueble[] = [];
  cliente: Cliente = new Cliente('', '', '', '', '');
  inmueble: Inmueble = new Inmueble('', '','','','');
  constructor(
    public _clienteService: ClienteService,
    public _inmuebleService: InmuebleService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {

    activatedRoute.params.subscribe( params => {

      let id = params['id'];

      if ( id !== 'nuevo' ) {
        this.cargarCliente( id );
      }

    });

  }

  ngOnInit() {

    this._inmuebleService.cargarInmuebles()
          .subscribe( inmuebles => this.inmuebles = inmuebles );

    this._modalUploadService.notificacion
          .subscribe( resp => {
            this.cliente.img = resp.cliente.img;
          });

  }

  cargarCliente( id: string ) {
    this._clienteService.cargarCliente( id )
          .subscribe( cliente => {

            console.log( cliente );
            this.cliente = cliente;
            this.cliente.inmueble = cliente.inmueble._id;
            this.cambioInmueble( this.cliente.inmueble );
          });
  }

  guardarCliente( f: NgForm ) {

    console.log( f.valid );
    console.log( f.value );

    if ( f.invalid ) {
      return;
    }

    this._clienteService.guardarCliente( this.cliente )
            .subscribe( cliente => {

              this.cliente._id = cliente._id;

              this.router.navigate(['/cliente', cliente._id ]);

            });

  }

  cambioInmueble( id: string ) {

    this._inmuebleService.obtenerInmueble( id )
          .subscribe( inmueble => this.inmueble = inmueble );

  }

  cambiarFoto() {

    this._modalUploadService.mostrarModal( 'clientes', this.cliente._id );

  }


}
