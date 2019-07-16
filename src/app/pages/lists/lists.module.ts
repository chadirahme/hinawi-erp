import { NgModule } from '@angular/core';

//import { TreeModule } from 'angular-tree-component';
//import { ThemeModule } from '../../@theme/theme.module';
// components

// service
import {CustomersListComponent} from "./customers-list/customers-list.component";
//import {NewsService} from "../extra-components/services/news.service";
import {ListsComponent} from "./lists.component";
import {ListsRoutingModule} from "./lists-routing.module";
import { ProspectiveListComponent } from './prospective-list/prospective-list.component';
import {Ng2SmartTableModule} from "ng2-smart-table";
import {ThemeModule} from "../../@theme/theme.module";
import { VendorsListComponent } from './vendors-list/vendors-list.component';
import { StudetnsListComponent } from './studetns-list/studetns-list.component';
import { MobileAttendanceComponent } from './mobile-attendance/mobile-attendance.component';
import { GeneralListComponent } from './general-list/general-list.component';
import {NbSelectModule} from "@nebular/theme";
import {CommonModule} from "@angular/common";

const COMPONENTS = [
    ListsComponent,
    CustomersListComponent,
    ProspectiveListComponent,
    VendorsListComponent,
    StudetnsListComponent
];

// const SERVICES = [
//     NewsService,
// ];

const MODULES = [
    CommonModule,
    ThemeModule,
    ListsRoutingModule,
    //TreeModule,
    Ng2SmartTableModule,
    NbSelectModule,
    //ToasterModule.forRoot(),
];

@NgModule({
    imports: [
        ...MODULES,
    ],
    declarations: [
        ...COMPONENTS,
        MobileAttendanceComponent,
        GeneralListComponent,
    ],
    providers: [
        //...SERVICES,
    ],
})
export class ListsModule { }
