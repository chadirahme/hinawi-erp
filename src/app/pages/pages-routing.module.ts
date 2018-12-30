import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {ChartdashboardComponent} from "./chartdashboard/chartdashboard.component";
import {SchooldashboardComponent} from "./schooldashboard/schooldashboard.component";

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'chartdashboard',
      component: ChartdashboardComponent,
    },
    {
      path: 'schooldashboard',
      component: SchooldashboardComponent,
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: 'lists',
      loadChildren: './lists/lists.module#ListsModule',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
