import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import {Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-amigos',
  templateUrl: './amigos.component.html',
  styles: []
})
export class AmigosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
