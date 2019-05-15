import { Component, AfterViewInit } from '@angular/core';


import * as Prism from 'prismjs';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent implements AfterViewInit {  

  constructor(    
  ) { }


  ngAfterViewInit() {
    Prism.highlightAll(); 
  }

}
