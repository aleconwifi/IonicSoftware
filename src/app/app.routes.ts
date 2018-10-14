import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages/pages.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { LoginGuardGuard } from './services/guards/login-guard.guard';
import { EnesperaComponent } from './shared/enespera/enespera.component';



const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
   
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        loadChildren: './pages/pages.module#PagesModule'
    },
    { path: 'aprobar', component: EnesperaComponent },
    { path: '**', component: NopagefoundComponent }
];


export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );
