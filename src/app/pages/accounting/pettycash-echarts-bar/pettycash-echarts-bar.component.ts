import {Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import {NbThemeService} from "@nebular/theme";
import {ApiAuth} from "../../../@core/services/api.auth";
import { takeWhile } from 'rxjs/operators';
import {WebDashboard} from "../../../@core/domains/webdashboard.model";
@Component({
  selector: 'pettycash-echarts-bar',
//   template: `
// <pettycash-legend-chart-component [legendItems]="chartLegend"></pettycash-legend-chart-component>
//     <div echarts [options]="options" class="echart"></div>
//   `,
   templateUrl: './pettycash-echarts-bar.component.html',
   styleUrls: ['./pettycash-echarts-bar.component.scss']
})
export class PettycashEchartsBarComponent implements AfterViewInit, OnDestroy {
  private alive = true;
  options: any = {};
  themeSubscription: any;
  chartLegend: {iconColor: string; title: string}[];
  currentTheme: string;
  year2018:any[];
  year2019:any[];
  webDashboard : WebDashboard;
  isPettyCashFav = false;

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
    this.loadData();
    this.loadDashBoardData();
    console.log("onlint1");
  }

  loadData(): void {
    try
    {
      this.year2018=[];
      this.year2019=[];
      this.apiAuth.getPettyCashChart().subscribe(data => {
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
        title: '2018',
      },
      {
        iconColor: '#5dcfe3',//orderProfitLegend.secondItem,
        title: '2019',
      },
      // {
      //   iconColor: orderProfitLegend.thirdItem,
      //   title: 'All orders',
      // },
    ];
  }
  ngAfterViewInit(){
    console.log("ngAfterViewInit");
  }

  loadngAfterViewInit() { //ngAfterViewInit
    this.themeSubscription = this.themeService.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        //color: [colors.primaryLight, colors.infoLight],
        color: ['#719efc', '#5dcfe3'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        // title: {
        //   text: 'Monthly Average Rainfall'
        // },
        // subtitle: {
        //   text: 'Source: WorldClimate.com'
        // },
        // legend: {
        //   left: 'left',
        //   data: ['Line 1', 'Line 2', 'Line 3'],
        //   textStyle: {
        //     color: echarts.textColor,
        //   },
        //   display: true,
        // },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: [ 'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec'],
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: echarts.splitLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        series: [
          {
            name: '2018',
            type: 'bar',
            barWidth: '30%',
            data: this.year2018,//[50, 5, 200, 334, 390, 330, 220],
          },
          {
            name: '2019',
            type: 'bar',
            barWidth: '40%',
            data: this.year2019,//[100, 10, 200, 334, 390, 330, 220,11,222,333],
          },
        ],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  addPettyCashFav(){
    this.isPettyCashFav=!this.isPettyCashFav;
    this.saveData("pettycash" , !this.isPettyCashFav);
  }

  loadDashBoardData(): void {
    try {
      const that = this;
      this.apiAuth.getUserDashboards(localStorage.getItem('userid')).subscribe(data => {
        data.result.forEach(function (value) {
          if(value.dashName=='pettycash')
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
