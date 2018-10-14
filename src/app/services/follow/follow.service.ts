import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Follow } from '../../models/follow.model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class FollowService {

	constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ){

	}

	addFollow(token, follow):Observable<any> {
    let params = JSON.stringify(follow);
    let url = URL_SERVICIOS + '/follow';
    url += '?token=' + this._usuarioService.token;


	 	return this.http.post(url, params);
  }
  

	deleteFollow(token, id):Observable<any>{

    let url = URL_SERVICIOS + '/follow/' + id;
    url += '?token=' + this._usuarioService.token;
		

		return this.http.delete(url);
  }
  


	getFollowing(token, userId = null, page = 1):Observable<any>{

    let url = URL_SERVICIOS + '/following';
    url += '?token=' + this._usuarioService.token;				 
		if(userId != null){
      url = URL_SERVICIOS +'/following/'+userId+'/'+page;
      url += '?token=' + this._usuarioService.token;				 

		}							  
		
		return this.http.get(url);
	}

	getFollowed(token, userId = null, page = 1):Observable<any>{


		let url = URL_SERVICIOS + '/followed';
    url += '?token=' + this._usuarioService.token;					 
		if(userId != null){
      url = URL_SERVICIOS+'/followed/'+userId+'/'+page;
      url += '?token=' + this._usuarioService.token;				
		}							  
		
		return this.http.get(url);
	}

	getMyFollows(token):Observable<any>{

    let url = URL_SERVICIOS + '/get-my-follows/true';
    url += '?token=' + this._usuarioService.token;	
		
		return this.http.get(url);
	}

}
