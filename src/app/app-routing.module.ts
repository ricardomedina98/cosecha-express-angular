import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { CoreComponent } from './core';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    { 
        path: '',
        component: CoreComponent,
        canActivate: [AuthGuard],
        children: [ {
            path: '',
            component: HomeComponent
        },
        {
            path: 'perfil',
            component: ProfileComponent
        }    
    ]

    },
    {
        path: '**',
        redirectTo: ''
    }
];


@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
  })
  
export class AppRoutingModule { }
