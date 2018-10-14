import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import {Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-amigose',
  templateUrl: './amigose.component.html',
  styles: []
})
export class AmigoseComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;

  mostrarDatos: boolean;

  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor
  (public _usuarioService: UsuarioService) { }

  ngOnInit() {

    this.cargarUsuarios();
  }

  

  cargarUsuarios() {

    this.cargando = true;

    this._usuarioService.cargarUsuarios( this.desde )
              .subscribe( (resp: any) => {

                this.totalRegistros = resp.total;
                this.usuarios = resp.usuarios;
                this.cargando = false;

              });

  }

}
