/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ApiAuth} from "./@core/services/api.auth";
import {ChartModule} from "angular2-chartjs";
import {WsTopic} from "./@core/services/ws.topic";
import {AuthGuard} from "./auth-guard.service";
import { LoginComponent } from './login/login.component';
import {PettycashLegendChartComponentComponent} from "./pages/accounting/pettycash-legend-chart-component/pettycash-legend-chart-component.component";
import {PettycashEchartsBarComponent} from "./pages/accounting/pettycash-echarts-bar/pettycash-echarts-bar.component";

@NgModule({
  declarations: [AppComponent, LoginComponent,
    //PettycashEchartsBarComponent,
    //PettycashLegendChartComponentComponent
    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ChartModule,

    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [ApiAuth,WsTopic,AuthGuard,
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
})
export class AppModule {
}
