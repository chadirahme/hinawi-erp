import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CucComponent} from "./cuc/cuc.component";
import {AccountingComponent} from "./accounting.component";
import {PoComponent} from "./po/po.component";
import {PettycashComponent} from "./pettycash/pettycash.component";
import {PettycashEchartsBarComponent} from "./pettycash-echarts-bar/pettycash-echarts-bar.component";
import {QuotationChartComponent} from "./quotation-chart/quotation-chart.component";

const routes: Routes = [{
    path: '',
    component: AccountingComponent,
    children: [
        {
            path: 'cuc',
            component: CucComponent,
        },
      {
        path: 'po',
        component: PoComponent,
      },
      {
        path: 'pettycash',
        component: PettycashComponent,
      },
      {
        path: 'pettycashchart',
        component: PettycashEchartsBarComponent,
      },
      {
        path: 'quotationchart',
        component: QuotationChartComponent,
      },

    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AccountingRoutingModule {
}
