import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {ProfitChart} from "../../@core/data/profit-chart.service";
import {OrdersChart} from "../../@core/data/orders-chart.service";
import {ProfitChartComponent} from "./charts/profit-chart.component";
import { takeWhile } from 'rxjs/operators';
import {OrdersChartComponent} from "./charts/orders-chart.component";
import {OrderProfitChartSummary, OrdersProfitChartService} from "../../@core/data/orders-profit-chart.service";
import {ApiAuth} from "../../@core/services/api.auth";
import {WebDashboard} from "../../@core/domains/webdashboard.model";

@Component({
  selector: 'chartdashboard',
  templateUrl: './chartdashboard.component.html',
  styleUrls: ['./chartdashboard.component.scss']
})
export class ChartdashboardComponent implements OnDestroy  {

  isProfitFav = false;
  isFixedAssetFav = false;
  private alive = true;
  webDashboard: any;

  chartPanelSummary: OrderProfitChartSummary[];
  period: string = 'week';
  ordersChartData: OrdersChart;
  profitChartData: ProfitChart;

  @ViewChild('ordersChart') ordersChart: OrdersChartComponent;
  @ViewChild('profitChart') profitChart: ProfitChartComponent;

  constructor(private ordersProfitChartService: OrdersProfitChartService,private apiAuth: ApiAuth) {
    this.ordersProfitChartService.getOrderProfitChartSummary()
      .pipe(takeWhile(() => this.alive))
      .subscribe((summary) => {
        this.chartPanelSummary = summary;
      });

    this.getOrdersChartData(this.period);
    this.getProfitChartData(this.period);
  }

  setPeriodAndGetChartData(value: string): void {
    if (this.period !== value) {
      this.period = value;
    }

    this.getOrdersChartData(value);
    this.getProfitChartData(value);
  }

  changeTab(selectedTab) {
    if (selectedTab.tabTitle === 'Profit') {
      this.profitChart.resizeChart();
    } else {
      this.ordersChart.resizeChart();
    }
  }

  getOrdersChartData(period: string) {
    this.ordersProfitChartService.getOrdersChartData(period)
      .pipe(takeWhile(() => this.alive))
      .subscribe(ordersChartData => {
        this.ordersChartData = ordersChartData;
      });
  }

  getProfitChartData(period: string) {
    this.ordersProfitChartService.getProfitChartData(period)
      .pipe(takeWhile(() => this.alive))
      .subscribe(profitChartData => {
        this.profitChartData = profitChartData;
      });
  }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy() {
    this.alive = false;
  }


  loadData(): void {
    try {
      const that = this;
      this.apiAuth.getUserDashboards(1).subscribe(data => {
        data.result.forEach(function (value) {
          if(value.dashName=='profit')
            that.isProfitFav=true;
          if(value.dashName=='fixedassets')
            that.isFixedAssetFav=true;
        });
      });
    }
    catch (e) {
      console.log(e);
    }
  }

  addProfitFav(){
    this.isProfitFav=!this.isProfitFav;
    this.saveData("profit" , !this.isProfitFav);
  }
  addFixedAssetFav(){
    this.isFixedAssetFav=!this.isFixedAssetFav;
    this.saveData("fixedassets" , !this.isFixedAssetFav);
  }

   saveData(dashname , isDelete): void {
    try
    {
      // console.log("grade>> "+ this.apiParam.grade);
      this.webDashboard =new WebDashboard();
      this.webDashboard.userId=1;
      this.webDashboard.dashName=dashname;
      this.webDashboard.dashOrder=0;

      if(!isDelete) {
        this.apiAuth.addWebDashboard(this.webDashboard).subscribe(data => {
          console.log(data);
        });
      }
      else {
        this.apiAuth.deleteWebDashBoard(this.webDashboard).subscribe(data => {
          console.log(data);
        });
      }
    }

    catch (e) {
      console.log(e);
    }
  }

}
