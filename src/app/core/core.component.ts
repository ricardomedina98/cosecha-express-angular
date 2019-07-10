import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})

export class CoreComponent implements OnInit {

  constructor(
    private permissionsService: NgxPermissionsService
  ) { }

  ngOnInit() {
    
  }

  getYear(){
    return (new Date()).getFullYear();
  }

}
