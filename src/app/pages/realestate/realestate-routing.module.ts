import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RealestateComponent} from "./realestate.component";
import {StatusChartComponent} from "./status-chart/status-chart.component";
import {FlattypeChartComponent} from "./flattype-chart/flattype-chart.component";
import {SalesChartComponent} from "./sales-chart/sales-chart.component";
import {ProfitChartComponent} from "./profit-chart/profit-chart.component";
import {MonthlySalesChartComponent} from "./monthly-sales-chart/monthly-sales-chart.component";

const routes: Routes = [{
  path: '',
  component: RealestateComponent,
  children: [
    {
      path: 'sales-chart',
      component: SalesChartComponent,
    },
    {
      path: 'status-chart',
      component: StatusChartComponent,
    },
    {
      path: 'flattype-chart',
      component: FlattypeChartComponent,
    },
    {
      path: 'profit-chart',
      component: ProfitChartComponent,
    },
    {
      path: 'monthly-sales-chart',
      component: MonthlySalesChartComponent,
    },
  ],
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RealestateRoutingModule { }
