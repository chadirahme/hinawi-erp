import { NgModule } from '@angular/core';
import {ThemeModule} from "../../@theme/theme.module";
import {ReportsRoutingModule} from "./reports-routing.module";
import {ReportsComponent} from "./reports.component";
import {AttendanceReportComponent} from "./attendance-report/attendance-report.component";
import {Ng2SmartTableModule} from "ng2-smart-table";
import { AttendanceMonthlyComponent } from './attendance-monthly/attendance-monthly.component';
import { AttendanceByreasonComponent } from './attendance-byreason/attendance-byreason.component';
import {ReasonPieComponent} from "./attendance-byreason/reason-pie.component";
import { AttendanceByreasonPiechartComponent } from './attendance-byreason-piechart/attendance-byreason-piechart.component';
import {PagesSharedModule} from "../pages-shared.module";
import { AbsenceReportComponent } from './absence-report/absence-report.component';
import {NbDatepickerModule} from "@nebular/theme";
import {DecimalPipe} from "@angular/common";
import { AttendanceBymoveComponent } from './attendance-bymove/attendance-bymove.component';

const COMPONENTS = [
  ReportsComponent,
  AttendanceReportComponent,
  //ReasonPieComponent
];

const MODULES = [
  ThemeModule,
  Ng2SmartTableModule,
  ReportsRoutingModule,
  NbDatepickerModule,
  //ReasonPieComponent
];

@NgModule({
  imports: [
    ...MODULES,
    PagesSharedModule,
  ],
  declarations: [
    ...COMPONENTS,
    AttendanceMonthlyComponent,
    AttendanceByreasonComponent,
    AbsenceReportComponent,
    AttendanceBymoveComponent,
    //AttendanceByreasonPiechartComponent, remove from here and add it to PagesSharedModule
  ],
  providers: [
    DecimalPipe,
    //...SERVICES,
  ],
})
export class ReportsModule { }
