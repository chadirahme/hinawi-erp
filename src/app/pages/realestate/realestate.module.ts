import { NgModule } from '@angular/core';
import {CommonModule, CurrencyPipe, DecimalPipe} from '@angular/common';

import { RealestateRoutingModule } from './realestate-routing.module';
import { StatusChartComponent } from './status-chart/status-chart.component';
import {RealestateComponent} from "./realestate.component";
import {ThemeModule} from "../../@theme/theme.module";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {NbDialogModule} from "@nebular/theme";
import {PagesSharedModule} from "../pages-shared.module";
import { FlattypeChartComponent } from './flattype-chart/flattype-chart.component';
import { SalesChartComponent } from './sales-chart/sales-chart.component';
import { ProfitChartComponent } from './profit-chart/profit-chart.component';
import { MonthlySalesChartComponent } from './monthly-sales-chart/monthly-sales-chart.component';

const COMPONENTS = [
  RealestateComponent,
  // StatusChartComponent we remove from here and add in PagesSharedModule else throw error [options] in charts
];

const MODULES = [
  ThemeModule,
  RealestateRoutingModule,
  Ng2SmartTableModule,
  NbDialogModule.forChild(), //add this to work entryComponents
  //ToasterModule.forRoot(),
];

@NgModule({
  imports: [
    ...MODULES,
    PagesSharedModule
  ],
  declarations: [
    ...COMPONENTS,
    //MonthlySalesChartComponent,
    //ProfitChartComponent,
    //SalesChartComponent,
    //FlattypeChartComponent,
  ],
  providers: [
    CurrencyPipe,
    DecimalPipe,
    //...SERVICES,
  ],
})

export class RealestateModule { }
