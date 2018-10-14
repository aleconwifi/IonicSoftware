
import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';

import { SharedModule } from '../shared/shared.module';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


// ng2-charts
import { ChartsModule } from 'ng2-charts';

import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';

// Pipe Module
import { PipesModule } from '../pipes/pipes.module';

import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { InmueblesComponent } from './inmuebles/inmuebles.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteComponent } from './clientes/cliente.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { Inmueble2Component } from './inmueble2/inmueble2.component';
import { AmigoseComponent } from './amigose/amigose.component';
import { Inmueble3Component } from './inmueble3/inmueble3.component';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { AmigosComponent } from './amigos/amigos.component';
import { EsperaComponent } from './espera/espera.component';

@NgModule({
    declarations: [
        // PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccoutSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsuariosComponent,
        // ModalUploadComponent,
        InmueblesComponent,
        ClientesComponent,
        ClienteComponent,
        BusquedaComponent,
        Inmueble2Component,
        AmigoseComponent,
        Inmueble3Component,
        SolicitudComponent,
        AmigosComponent,
        EsperaComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        PipesModule
    ]
})
export class PagesModule { }
