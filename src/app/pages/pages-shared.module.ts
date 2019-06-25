import {NgModule} from "@angular/core";
import {PettycashEchartsBarComponent} from "./accounting/pettycash-echarts-bar/pettycash-echarts-bar.component";
import {PettycashLegendChartComponentComponent} from "./accounting/pettycash-legend-chart-component/pettycash-legend-chart-component.component";
import {ThemeModule} from "../@theme/theme.module";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {NgxEchartsModule} from "ngx-echarts";
import {ChartModule} from "angular2-chartjs";
@NgModule({
  declarations: [ PettycashEchartsBarComponent,PettycashLegendChartComponentComponent ],
  exports: [ PettycashEchartsBarComponent,PettycashLegendChartComponentComponent ],
  imports:[ThemeModule, ChartModule,
    NgxEchartsModule,
    NgxChartsModule,]
})
export class PagesSharedModule {}
