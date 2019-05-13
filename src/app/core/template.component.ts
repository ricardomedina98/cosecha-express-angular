import { Component, AfterViewInit } from '@angular/core';

import * as Prism from 'prismjs';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements AfterViewInit {

  constructor() { }


  ngAfterViewInit() {
    Prism.highlightAll();
  }

}
