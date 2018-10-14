import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { URL_SERVICIOS } from '../../config/config';

@Injectable()
export class Usuario2Service {
  public url: string;
	public usuario;
	public token;


  constructor(public http: HttpClient) {
    this.url = URL_SERVICIOS;
   }

   getIdentity(){
		let usuario = JSON.parse(localStorage.getItem('usuario'));

		if(usuario != "undefined"){
			this.usuario = usuario;
		}else{
			this.usuario = null;
		}

		return this.usuario;
	}

	getToken(){
		let token = localStorage.getItem('token');

		if(token != "undefined"){
			this.token = token;
		}else{
			this.token = null;
		}

		return this.token;
	}

	


}
