import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CustomersListComponent} from "./customers-list/customers-list.component";
import {ListsComponent} from "./lists.component";
import {ProspectiveListComponent} from "./prospective-list/prospective-list.component";
import {VendorsListComponent} from "./vendors-list/vendors-list.component";
import {StudetnsListComponent} from "./studetns-list/studetns-list.component";

const routes: Routes = [{
    path: '',
    component: ListsComponent,
    children: [
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
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ListsRoutingModule {
}
