import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';

import {BoxModule, InputGroupModule, InputTextModule} from 'angular-admin-lte';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, NgControl } from '@angular/forms';



describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      imports: [
        BoxModule,
        InputGroupModule,
        InputTextModule
      ],
      providers: [
        FormBuilder,
        NgControl
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
