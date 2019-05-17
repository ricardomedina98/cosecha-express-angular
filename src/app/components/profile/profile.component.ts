import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AuthentificationService } from '../../services/authentification.service';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    public currentUser;
    profileForm: FormGroup;
    loading = false;
    submitted = false;
    error = '';

    constructor(
        private authenticationService: AuthentificationService,
        private formBuilder: FormBuilder,
        private userService: UserService,
        private toastr: ToastrService
    ) { 
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.profileForm = this.formBuilder.group({
            nombre_employee: ['', Validators.required],
            nombre_usuario: ['', Validators.required],
            contrasena: [] 
        });

        this.profileForm.controls['nombre_employee'].setValue(this.currentUser.usuario.nombre_empleado);
        this.profileForm.controls['nombre_usuario'].setValue(this.currentUser.usuario.nombre_usuario);        
    }

    get f() { return this.profileForm.controls; }

    onSubmit() {
        this.submitted = true;

        console.log(this.profileForm);
        
        if (this.profileForm.invalid) {
            return;
        }

        this.userService.updateUser(this.f.nombre_employee.value, this.f.nombre_usuario.value, this.f.contrasena.value)
        .pipe(first())
        .subscribe(
            data=> {
                if(data.OK){
                    this.toastr.success('Informacion actualizada!');
                }
            },
            error => {
                this.toastr.error('Error al actualizar la informacion');
            }
        );
    }

}
