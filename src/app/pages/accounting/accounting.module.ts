import { NgModule } from '@angular/core';
import {AccountingRoutingModule} from "./accounting-routing.module";
import {AccountingComponent} from "./accounting.component";
import {CucComponent} from "./cuc/cuc.component";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {ThemeModule} from "../../@theme/theme.module";
import {CurrencyPipe, DecimalPipe} from "@angular/common";
import { EditCucComponent } from './edit-cuc/edit-cuc.component';
import {NbDialogModule} from "@nebular/theme";
import { PoComponent } from './po/po.component';
import { EditPoComponent } from './edit-po/edit-po.component';
import { PettycashComponent } from './pettycash/pettycash.component';
import { EditPettycashComponent } from './edit-pettycash/edit-pettycash.component';
import {ChartModule} from "angular2-chartjs";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {NgxEchartsModule} from "ngx-echarts";
import {PagesModule} from "../pages.module";
import {PagesSharedModule} from "../pages-shared.module";

const COMPONENTS = [
  AccountingComponent,
  CucComponent,
  PoComponent,

];

// const SERVICES = [
//     NewsService,
// ];

const MODULES = [
    ThemeModule,
  AccountingRoutingModule,
    //TreeModule,
    Ng2SmartTableModule,
  NbDialogModule.forChild(), //add this to work entryComponents
    //ToasterModule.forRoot(),
];

@NgModule({
    imports: [
        ...MODULES,
      // ChartModule,
      // NgxEchartsModule,
      // NgxChartsModule,
     PagesSharedModule
    ],
    declarations: [
        ...COMPONENTS,
        EditCucComponent,
        EditPoComponent,
        PettycashComponent,
        EditPettycashComponent,

        //PettycashEchartsBarComponent,
        //PettycashLegendChartComponentComponent,
    ],
    providers: [
      CurrencyPipe,
      DecimalPipe,
        //...SERVICES,
    ],
  entryComponents: [EditCucComponent,EditPoComponent,EditPettycashComponent]
})
export class AccountingModule { }
