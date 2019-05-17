import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoreComponent } from './core.component';


const routes: Routes = [
  {
    path: '',
    component: CoreComponent,
    children: [
      {
        path: '',
        loadChildren: '../components/home/home.module#HomeModule'
      },
      {
        path: 'perfil',
        loadChildren: '../components/profile/profile.module#ProfileModule',
        data: {
          title: 'Perfil'
        }
      },
      {
        path:'proveedores',
        loadChildren: '../components/providers/providers.module#ProvidersModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
