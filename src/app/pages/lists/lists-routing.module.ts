import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CustomersListComponent} from "./customers-list/customers-list.component";
import {ListsComponent} from "./lists.component";
import {ProspectiveListComponent} from "./prospective-list/prospective-list.component";
import {VendorsListComponent} from "./vendors-list/vendors-list.component";
import {StudetnsListComponent} from "./studetns-list/studetns-list.component";
import {MobileAttendanceComponent} from "./mobile-attendance/mobile-attendance.component";
import {GeneralListComponent} from "./general-list/general-list.component";
import {EmployeesListComponent} from "./employees-list/employees-list.component";

const routes: Routes = [{
    path: '',
    component: ListsComponent,
    children: [
      {
        path: 'general-list',
        component: GeneralListComponent,
      },
        {
            path: 'customers-list',
            component: CustomersListComponent,
        },
        {
            path: 'prospective-list',
            component: ProspectiveListComponent,
        },
      {
        path: 'vendors-list',
        component: VendorsListComponent,
      },
      {
        path: 'students-list',
        component: StudetnsListComponent,
      },
      {
        path: 'mobile-attendance',
        component: MobileAttendanceComponent,
      },
      {
        path: 'employees-list',
        component: EmployeesListComponent,
      },
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ListsRoutingModule {
}
