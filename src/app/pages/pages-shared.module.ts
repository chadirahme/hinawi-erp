import {NgModule} from "@angular/core";
import {PettycashEchartsBarComponent} from "./accounting/pettycash-echarts-bar/pettycash-echarts-bar.component";
import {PettycashLegendChartComponentComponent} from "./accounting/pettycash-legend-chart-component/pettycash-legend-chart-component.component";
import {ThemeModule} from "../@theme/theme.module";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {NgxEchartsModule} from "ngx-echarts";
import {ChartModule} from "angular2-chartjs";
import {StatusChartComponent} from "./realestate/status-chart/status-chart.component";
import {FlattypeChartComponent} from "./realestate/flattype-chart/flattype-chart.component";
import {SalesChartComponent} from "./realestate/sales-chart/sales-chart.component";
import {ProfitChartComponent} from "./realestate/profit-chart/profit-chart.component";
import {MonthlySalesChartComponent} from "./realestate/monthly-sales-chart/monthly-sales-chart.component";
import {QuotationChartComponent} from "./accounting/quotation-chart/quotation-chart.component";
@NgModule({
  declarations: [ PettycashEchartsBarComponent,PettycashLegendChartComponentComponent,StatusChartComponent,FlattypeChartComponent,
    SalesChartComponent,ProfitChartComponent,MonthlySalesChartComponent,QuotationChartComponent ],
  exports: [ PettycashEchartsBarComponent,PettycashLegendChartComponentComponent,StatusChartComponent,FlattypeChartComponent,
    SalesChartComponent,ProfitChartComponent,MonthlySalesChartComponent,QuotationChartComponent ],
  imports:[ThemeModule, ChartModule,
    NgxEchartsModule,
    NgxChartsModule,]
})
export class PagesSharedModule {}
