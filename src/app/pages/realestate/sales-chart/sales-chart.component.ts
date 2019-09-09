import {Component, OnDestroy, AfterViewInit} from '@angular/core';
import {WebDashboard} from "../../../@core/domains/webdashboard.model";
import { takeWhile } from 'rxjs/operators';
import {NbThemeService, NbColorHelper} from "@nebular/theme";
import {ApiAuth} from "../../../@core/services/api.auth";

@Component({
  selector: 'sales-chart',
  templateUrl: './sales-chart.component.html',
  styleUrls: ['./sales-chart.component.scss']
})
export class SalesChartComponent implements AfterViewInit, OnDestroy {

  private alive = true;
  options: any = {};
  data: any;
  themeSubscription: any;
  chartLegend: {iconColor: string; title: string}[];
  currentTheme: string;
  year2018:any[];
  year2019:any[];
  webDashboard : WebDashboard;
  isPettyCashFav = false;
  dashName="realestate";

  constructor(private themeService: NbThemeService,private apiAuth: ApiAuth) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        const orderProfitLegend = theme.variables.orderProfitLegend;

        this.currentTheme = theme.name;
        this.setLegendItems(orderProfitLegend);
      });
  }


  ngOnInit() {
    console.log("onlint");
    //this.loadData();
    //this.loadDashBoardData();
    this.loadngAfterViewInit();
    console.log("onlint1");
  }

  loadData(): void {
    try
    {
      this.year2018=[];
      this.year2019=[];
      this.apiAuth.getFlatsByStatusChart().subscribe(data => {
        let payments2018 = data["2018"];
        for (var j=0; j<12; j++) {
          let payment = payments2018[j];
          if(payment==null)
            this.year2018.push(0);
          else
            this.year2018.push(payment["total"]);
        }
        let payments2019 = data["2019"];
        for (var j=0; j<12; j++) {
          let payment = payments2019[j];
          if(payment==null)
            this.year2019.push(0);
          else
            this.year2019.push(payment["total"]);
        }
        this.loadngAfterViewInit();

      });

    }
    catch (e) {
      console.log(e);
    }
  }

  setLegendItems(orderProfitLegend) {
    this.chartLegend = [
      {
        iconColor: '#719efc',//orderProfitLegend.firstItem,
        title: 'Vacant',
      },
      {
        iconColor: '#5dcfe3',//orderProfitLegend.secondItem,
        title: 'Occupied',
      },
      // {
      //   iconColor: orderProfitLegend.thirdItem,
      //   title: 'All orders', Under Maintenance
      // },
    ];
  }
  ngAfterViewInit(){
    console.log("ngAfterViewInit");
  }

  loadngAfterViewInit() { //ngAfterViewInit
    this.themeSubscription = this.themeService.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July','Aug','Sep','Oct','Nov','Dec'],
        datasets: [{
          data: [25000, 10000, 7000, 5000, 3000,25000, 10000, 7000, 5000, 3000,9000,12000],
          label: 'Actual',
          backgroundColor: NbColorHelper.hexToRgbA(colors.primaryLight, 0.8),
        }, {
          data: [35000, 20000, 5000, 5000, 4000,15000, 9000, 8000, 6000, 5000,8000,11000],
          label: 'Expected',
          backgroundColor: NbColorHelper.hexToRgbA(colors.infoLight, 0.8),
        }],
      };

      this.options = {
        //maintainAspectRatio: false,
        //responsive: true,
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
        },
      };

    });
  }


  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  addPettyCashFav(){
    this.isPettyCashFav=!this.isPettyCashFav;
    this.saveData(this.dashName , !this.isPettyCashFav);
  }

  loadDashBoardData(): void {
    try {
      const that = this;
      this.apiAuth.getUserDashboards(localStorage.getItem('userid')).subscribe(data => {
        data.result.forEach(function (value) {
          if(value.dashName==that.dashName)
            that.isPettyCashFav=true;
          //console.log(value);
        });
      });
    }
    catch (e) {
      console.log(e);
    }
  }

  saveData(dashname , isDelete): void {
    try
    {
      // console.log("grade>> "+ this.apiParam.grade);
      this.webDashboard =new WebDashboard();
      this.webDashboard.userId=+localStorage.getItem('userid');
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
