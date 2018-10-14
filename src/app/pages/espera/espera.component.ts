import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Usuario } from '../../models/usuario.model';
import { Follow } from '../../models/follow.model';
import { FollowService } from '../../services/service.index';

import { UsuarioService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { URL_SERVICIOS } from '../../config/config';


declare var swal: any;

@Component({
  selector: 'app-espera',
  templateUrl: './espera.component.html',
  styles: []
})
export class EsperaComponent implements OnInit {
  //esto me carga los usuarios
  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = true;

  //componente follow
	public url: string;
	public identity;
	public token;
	public page;
	public next_page;
	public prev_page;
	public total;
	public pages;
	public usuarios: Usuario[];
	public follows;
	public status: string;

  constructor(
    private _route: ActivatedRoute,
		private _router: Router,
		private _followService: FollowService,
    private _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) { 
      this.url =URL_SERVICIOS;
      this.identity = this._usuarioService.getIdentity();
      this.token = this._usuarioService.getToken();

  }

  ngOnInit() {
    //this.cargarUsuarios();

    //this._modalUploadService.notificacion
      //    .subscribe( resp => this.cargarUsuarios() );
      this.actualPage();

  }

  actualPage(){
		this._route.params.subscribe(params => {
			let page = +params['page'];
			this.page = page;

			if(!params['page']){
				page = 1;
			}

			if(!page){
				page = 1;
			}else{
				this.next_page = page+1;
				this.prev_page = page-1;

				if(this.prev_page <= 0){
					this.prev_page = 1;
				}
			}

			// devolver listado de usuarios
			this.getUsers(page);
		});
  }
  
  getUsers(page){
		this._usuarioService.getUsers(page).subscribe(
			response => {
				if(!response.usuarios){
					this.status = 'error';
				}else{
					this.total = response.total;
					this.usuarios = response.usuarios;
					this.pages = response.pages;
					this.follows = response.users_following;

					if(page > this.pages){
						this._router.navigate(['/gente',1]);
					}
				}
			},
			error => {
				var errorMessage = <any>error;
				console.log(errorMessage);

				if(errorMessage != null){
					this.status = 'error';
				}
			}
		);
  }
  
  public followUserOver;
	mouseEnter(usuario_id){
		this.followUserOver = usuario_id;
	}

	mouseLeave(usuario_id){
		this.followUserOver = 0;
	}

	followUser(followed){
		var follow = new Follow('',this.identity._id, followed);

		this._followService.addFollow(this.token, follow).subscribe(
			response => {
				if(!response.follow){
					this.status = 'error';
				}else{
					this.status = 'success';
          this.follows.push(followed);
          console.log(response);

				}
			},
			error => {
				var errorMessage = <any>error;
				console.log(errorMessage);

				if(errorMessage != null){
					this.status = 'error';
				}
			}
		);
	}

	unfollowUser(followed){
		this._followService.deleteFollow(this.token, followed).subscribe(
			response =>{
				var search = this.follows.indexOf(followed);
				if(search != -1){
					this.follows.splice(search, 1);
				}
			},
			error => {
				var errorMessage = <any>error;
				console.log(errorMessage);

				if(errorMessage != null){
					this.status = 'error';
				}
			}
		);
  }
  



  mostrarModal( id: string ) {

    this._modalUploadService.mostrarModal( 'usuarios', id );
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

  cambiarDesde( valor: number ) {

    let desde = this.desde + valor;

    if ( desde >= this.totalRegistros ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();

  }

  buscarUsuario( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this._usuarioService.buscarUsuarios( termino )
            .subscribe( (usuarios: Usuario[]) => {

              this.usuarios = usuarios;
              this.cargando = false;
            });

  }

  borrarUsuario( usuario: Usuario ) {

    if ( usuario._id === this._usuarioService.usuario._id ) {
      swal('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }

    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then( borrar => {

      if (borrar) {

        this._usuarioService.borrarUsuario( usuario._id )
                  .subscribe( borrado => {
                      this.cargarUsuarios();
                  });

      }

    });

  }

  guardarUsuario( usuario: Usuario ) {

    this._usuarioService.actualizarUsuario( usuario )
            .subscribe();

  }

}