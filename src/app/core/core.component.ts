import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})

export class CoreComponent implements OnInit {

  constructor(
    private permissionsService: NgxPermissionsService,
    private rolesService: NgxRolesService
  ) { }

  ngOnInit() {
 
  }

  getYear(){
    return (new Date()).getFullYear();
  }

}
