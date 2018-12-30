/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import {WsTopic} from "./@core/services/ws.topic";

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService,private wsTopic: WsTopic) {
  }

  ngOnInit() {
    this.analytics.trackPageViews();
    this.wsTopic.connect();
  }
}
