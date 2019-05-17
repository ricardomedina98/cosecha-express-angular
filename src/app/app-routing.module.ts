import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [ 
    {
        path: '',
        canActivate: [AuthGuard],
        data: {
            title: 'Inicio'
        },
        children: [
            {
                path: '',
                loadChildren: './components/home/home.module#HomeModule',
                data: {
                    title: 'Inicio'
                }
            }, 
            {
                path: 'perfil',
                loadChildren: './components/profile/profile.module#ProfileModule',
                data: {
                    title: 'Perfil'
                }
            }
        ]
    },
    {
        path: 'login',
        data: {
            title: 'Iniciar Sesion',
            customLayout: true
        },
        loadChildren: './components/login/login.module#LoginModule'
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
