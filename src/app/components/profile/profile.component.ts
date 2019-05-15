import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    profileForm: FormGroup;
    loading = false;
    submitted = false;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService
    ) { }

    ngOnInit() {
        this.profileForm = this.formBuilder.group({
            nombre_employee: ['', Validators.required],
            nombre_usuario: ['', Validators.required],
            contrasena: ['', Validators.required]            
        });

    }

    get f() { return this.profileForm.controls; }

    onSubmit() {
        this.submitted = true;
        
        if (this.profileForm.invalid) {
            return;
        }

        this.userService.updateUser(this.f.nombre_employee.value, this.f.nombre_usuario.value, this.f.contrasena.value)
        .pipe(first())
        .subscribe(
            data=> {
                console.log(data);
            }
        );
    }

}
