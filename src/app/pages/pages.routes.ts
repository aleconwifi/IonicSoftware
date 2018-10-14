import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { ProfileComponent } from './profile/profile.component';

// Guards
import { LoginGuardGuard } from '../services/service.index';
import { AdminGuard } from '../services/service.index';

import { UsuariosComponent } from './usuarios/usuarios.component';
import { InmueblesComponent } from './inmuebles/inmuebles.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteComponent } from './clientes/cliente.component';
import { Inmueble2Component } from './inmueble2/inmueble2.component';
import { AmigoseComponent } from './amigose/amigose.component';


import { BusquedaComponent } from './busqueda/busqueda.component';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';
import { Inmueble3Component } from './inmueble3/inmueble3.component';
import { AmigosComponent } from './amigos/amigos.component';
import { EsperaComponent } from './espera/espera.component';




const pagesRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [ VerificaTokenGuard ],
        data: { titulo: 'Dashboard' }
    },
    { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBars' } },
    { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Gráficas' } },
    { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
    { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
    { path: 'account-settings', component: AccoutSettingsComponent, data: { titulo: 'Ajustes de Tema' } },
    { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario' } },
    { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador' } },


    // Mantenimientos
    {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [ AdminGuard ],
        data: { titulo: 'Mantenimiento de Usuarios' }
    },
    { path: 'inmuebles', component: InmueblesComponent, data: { titulo: 'Gestión de Inmuebles' } },
    { path: 'clientes', component: ClientesComponent, data: { titulo: 'Gestión de Clientes' } },
    { path: 'cliente/:id', component: ClienteComponent, data: { titulo: 'Actualizar Cliente' } },
    { path: 'inmueble2/:id', component: Inmueble2Component, data: { titulo: 'Actualizar Inmueble' } },
    { path: 'inmueble3/:id', component: Inmueble3Component, data: { titulo: 'Ver Inmueble' } },
    { path: 'buscaramigos', component: AmigoseComponent, data: { titulo: 'Buscar Amigos' } },
    { path: 'amigos', component: AmigosComponent, data: { titulo: 'Solicitud a Usuarios' } },
    { path: 'gente/:page', component: EsperaComponent, data: { titulo: 'Solicitudes de amistad' } },
    { path: 'gente', component: EsperaComponent, data: { titulo: 'Solicitudes de amistad' } },


    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
