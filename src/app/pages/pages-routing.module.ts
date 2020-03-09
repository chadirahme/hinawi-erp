import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {ChartdashboardComponent} from "./chartdashboard/chartdashboard.component";
import {SchooldashboardComponent} from "./schooldashboard/schooldashboard.component";
import {FavdashboardComponent} from "./favdashboard/favdashboard.component";
import {Role} from "../@core/domains/user.model";
import {AuthGuard} from "../auth-guard.service";
import {RoleGuard} from "../role-guard.service";
import {MyAttendanceComponent} from "./my-attendance/my-attendance.component";

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'favdashboard',
      component:FavdashboardComponent,
    },

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
      path: 'my-attendance',
      component: MyAttendanceComponent,
    },
    {
      path: '',
      redirectTo: 'favdashboard',
      pathMatch: 'full',
    },
    {
      path: 'lists',
      loadChildren: './lists/lists.module#ListsModule',
    },
    {
      path: 'accounting',
      loadChildren: './accounting/accounting.module#AccountingModule',
    },
    {
      path: 'realestate',
      loadChildren: './realestate/realestate.module#RealestateModule',
    },
    {
      path: 'help',
      loadChildren: './help/help.module#HelpModule',
      canActivate: [RoleGuard],
      data: { roles: [Role.Admin] }
    },
    {
      path: 'reports',
      loadChildren: './reports/reports.module#ReportsModule',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
