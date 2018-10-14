import { Component, OnInit } from '@angular/core';
import { Inmueble } from '../../models/inmueble.model';
import { InmuebleitoService } from '../../services/service.index';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';


@Component({
  selector: 'app-inmueble2',
  templateUrl: './inmueble2.component.html',
  styles: []
})
export class Inmueble2Component implements OnInit {

  inmueble: Inmueble = new Inmueble('', '', '', '','','','');

  constructor(
    public _inmuebleService: InmuebleitoService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService : ModalUploadService
   ) { 


    activatedRoute.params.subscribe( params => {


      let id = params['id'];

      if (id !== 'nuevo' ){

        this.cargarInmueble( id );
      }

    });

   }

  ngOnInit() {

    this._modalUploadService.notificacion.
    subscribe(resp =>{

      this.inmueble.img = resp.inmueble.img;

    });
  }

  cargarInmueble(id: string){

    this._inmuebleService.cargarInmueble( id )
        .subscribe( inmueble =>  {
          
          this.inmueble = inmueble
          
          
          });


  }

  guardarInmueble( f: NgForm ){

    console.log( f.valid);
    console.log(f.value);

  if (f.invalid) {
    return;
  }

  this._inmuebleService.guardarInmueble(this.inmueble)
      .subscribe(inmueble => {

        this.inmueble._id = inmueble._id;

         this.router.navigate(['/inmueble2', inmueble._id]);

      });



  }

  cambiarFoto(){

    this._modalUploadService.mostrarModal('inmuebles', this.inmueble._id );
  }



}
