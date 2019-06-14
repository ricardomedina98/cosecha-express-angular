import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';

import { HttpClientModule } from '@angular/common/http';

import { NzTableModule, NzDropDownModule  } from 'ng-zorro-antd';

import { BoxModule } from 'angular-admin-lte';

import { NgZorroAntdModule, NZ_ICONS, NzSelectModule, NzModalModule } from 'ng-zorro-antd';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';



const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};

const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

import 'rxjs';


@NgModule({
  declarations: [ClientsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    NzTableModule,
    ClientsRoutingModule,
    DragDropModule,
    ScrollingModule,
    NzDropDownModule,
    NgZorroAntdModule,
    NzSelectModule,
    NzModalModule,
    BoxModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [{ provide: NZ_ICONS, useValue: icons }]
})
export class ClientsModule { }


