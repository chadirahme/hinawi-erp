import {NgModule, ErrorHandler} from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { ChartdashboardComponent } from './chartdashboard/chartdashboard.component';
import {ChartPanelSummaryComponent} from "./chartdashboard/chart-panel-summary/chart-panel-summary.component";
import {ChartPanelHeaderComponent} from "./chartdashboard/chart-panel-header/chart-panel-header.component";
import {ECommerceLegendChartComponent} from "./chartdashboard/legend-chart/legend-chart.component";
import {OrdersChartService} from "../@core/data/orders-chart.service";
import {OrdersChartComponent} from "./chartdashboard/charts/orders-chart.component";
import {ProfitChartComponent} from "./chartdashboard/charts/profit-chart.component";
import {OrdersProfitChartService} from "../@core/data/orders-profit-chart.service";
import {PeriodsService} from "../@core/data/periods.service";
import {ProfitChartService} from "../@core/data/profit-chart.service";
import {LayoutService} from "../@core/data/layout.service";
import {NgxEchartsModule} from "ngx-echarts";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {ChartModule} from "angular2-chartjs";
import { SchooldashboardComponent } from './schooldashboard/schooldashboard.component';
import {EchartsPieComponent} from "./schooldashboard/echarts-pie.component";
import {ReligionPieComponent} from "./schooldashboard/religion-pie.component";
import {EchartsBarComponent} from "./schooldashboard/echarts-bar.component";
import {NbBadgeModule} from "@nebular/theme";
import { FavdashboardComponent } from './favdashboard/favdashboard.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {ProfitBarComponent} from "./chartdashboard/profit-bar.component";
import {FixedAssetBarComponent} from "./chartdashboard/fixedasset-bar.component";
import {PagesSharedModule} from "./pages-shared.module";
import {PettycashEchartsBarComponent} from "./accounting/pettycash-echarts-bar/pettycash-echarts-bar.component";
import {PettycashLegendChartComponentComponent} from "./accounting/pettycash-legend-chart-component/pettycash-legend-chart-component.component";
import {AuthErrorHandler} from "../auth-error-handler";
import {SimpleDateComponent} from "../mycomponent/SimpleDateComponent";
import { MyAttendanceComponent } from './my-attendance/my-attendance.component';

const PAGES_COMPONENTS = [
  PagesComponent,
  ChartPanelSummaryComponent,
  ChartPanelHeaderComponent,
  ECommerceLegendChartComponent,
  OrdersChartComponent,
  ProfitChartComponent,
  EchartsPieComponent,
  ReligionPieComponent,
  EchartsBarComponent,
  ProfitBarComponent,
  FixedAssetBarComponent,
  //PettycashEchartsBarComponent,
  //PettycashLegendChartComponentComponent
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    MiscellaneousModule,
    ChartModule,
    NgxEchartsModule,
    NgxChartsModule,
    NbBadgeModule,
    DragDropModule,
    PagesSharedModule,
    //PettycashEchartsBarComponent,
   // PagesSharedComponent
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    ChartdashboardComponent,
    SchooldashboardComponent,
    FavdashboardComponent,
    MyAttendanceComponent,
   // PettycashEchartsBarComponent,
    //PettycashLegendChartComponentComponent,
    //CucComponent,
  ],
  providers: [OrdersChartService,OrdersProfitChartService,ProfitChartService,PeriodsService,
    LayoutService,
    //{provide: ErrorHandler, useClass: AuthErrorHandler},
  ],
  // entryComponents: [SimpleDateComponent]
})
export class PagesModule {
}
