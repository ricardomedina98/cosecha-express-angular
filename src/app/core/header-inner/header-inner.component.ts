import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../../services/authentification.service';

@Component({
    selector: 'app-header-inner',
    templateUrl: './header-inner.component.html',
    styleUrls: ['./header-inner.component.css']
})
export class HeaderInnerComponent implements OnInit {
    public currentUser;

    constructor(private authenticationService: AuthentificationService) {
        this.currentUser = authenticationService.currentUserValue;
    }

    ngOnInit() {
        console.log(this.currentUser.usuario);
    }

}
