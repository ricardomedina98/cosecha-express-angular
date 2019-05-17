import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';

import { InputGroupModule, InputTextModule as mkInputTextModule, BoxModule } from 'angular-admin-lte';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule,
    mkInputTextModule,
    InputGroupModule,
    BoxModule
  ]
})
export class ProfileModule { }
