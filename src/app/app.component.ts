import { Component } from '@angular/core';
import { LayoutService } from 'angular-admin-lte';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public customLayaout: boolean;

  constructor(
    private LayaoutService: LayoutService
  ) {}

  ngOnInit() {
    this.LayaoutService.isCustomLayout.subscribe((value: boolean) => {
      this.customLayaout = value;
    });
    
  }  
}
