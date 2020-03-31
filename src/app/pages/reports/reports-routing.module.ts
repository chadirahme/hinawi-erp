import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReportsComponent} from "./reports.component";
import {AttendanceReportComponent} from "./attendance-report/attendance-report.component";
import {AttendanceMonthlyComponent} from "./attendance-monthly/attendance-monthly.component";
import {AttendanceByreasonComponent} from "./attendance-byreason/attendance-byreason.component";
import {AbsenceReportComponent} from "./absence-report/absence-report.component";
import {AttendanceBymoveComponent} from "./attendance-bymove/attendance-bymove.component";
import {AttendanceDetailsComponent} from "./attendance-details/attendance-details.component";


const routes: Routes = [{
  path: '',
  component: ReportsComponent,
  children: [
    {
      path: 'attendance-report',
      component: AttendanceReportComponent,
    },
    {
      path: 'attendance-monthly',
      component: AttendanceMonthlyComponent,
    },
    {
      path: 'attendance-byreason',
      component: AttendanceByreasonComponent,
    },
    {
      path: 'attendance-bymove',
      component: AttendanceBymoveComponent,
    },
    {
      path: 'absence-report',
      component: AbsenceReportComponent
    },
    {
      path: 'attendance-details',
      component: AttendanceDetailsComponent
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {
}
