import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { FusionChartsModule } from 'angular-fusioncharts';

// Load FusionCharts
import * as FusionCharts from 'fusioncharts';
// Load Charts module
import * as Charts from 'fusioncharts/fusioncharts.charts';
// Load themes
import * as TimeSeries from 'fusioncharts/fusioncharts.timeseries';
import * as PowerCharts from 'fusioncharts/fusioncharts.powercharts';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';

import { HttpClientModule } from '@angular/common/http';

import { NzTableModule, NzDropDownModule, NzRadioModule } from 'ng-zorro-antd';

import { BoxModule } from 'angular-admin-lte';

import { NgZorroAntdModule, NZ_ICONS, NzSelectModule, NzModalModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import en from '@angular/common/locales/en';
registerLocaleData(en);

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

import 'rxjs';

// Add dependencies to FusionChartsModule
FusionChartsModule.fcRoot(
  FusionCharts,
  Charts,
  TimeSeries,
  PowerCharts
)

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    FusionChartsModule,
    ProductsRoutingModule,
    HttpClientModule,
    NzTableModule,
    NzSelectModule,
    DragDropModule,
    ScrollingModule,
    NzDropDownModule, 
    NzRadioModule,   
    NzModalModule,
    NgZorroAntdModule,  
    BoxModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, { provide: NZ_ICONS, useValue: icons }]
})
export class ProductsModule { }
