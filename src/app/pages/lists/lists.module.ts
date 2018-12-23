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

const COMPONENTS = [
    ListsComponent,
    CustomersListComponent,
  ProspectiveListComponent,
];

// const SERVICES = [
//     NewsService,
// ];

const MODULES = [
    ThemeModule,
    ListsRoutingModule,
    //TreeModule,
    Ng2SmartTableModule,
    //ToasterModule.forRoot(),
];

@NgModule({
    imports: [
        ...MODULES,
    ],
    declarations: [
        ...COMPONENTS,
        VendorsListComponent,
    ],
    providers: [
        //...SERVICES,
    ],
})
export class ListsModule { }
