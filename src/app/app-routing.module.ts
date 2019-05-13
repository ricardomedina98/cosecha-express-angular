import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TemplateComponent } from './core/template.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
    { 
        path: '',
        component: TemplateComponent, 
        canActivate: [AuthGuard],
        children: [{
            path: '',
            component: HomeComponent
        }]
    },
    {
        path: 'login',
        component: LoginComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
