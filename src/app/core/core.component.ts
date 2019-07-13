import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})

export class CoreComponent implements OnInit {

  constructor(
    private permissionsService: NgxPermissionsService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    const perm = ["ADMIN", "EDITOR"];
 
    this.permissionsService.loadPermissions(perm);


    this.http.get('url').subscribe((permissions) => {
      console.log(permissions);
       //const perm = ["ADMIN", "EDITOR"]; example of permissions
     
    })
  }

  getYear(){
    return (new Date()).getFullYear();
  }


}