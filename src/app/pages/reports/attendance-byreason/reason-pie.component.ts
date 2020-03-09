import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import {ApiAuth} from "../../../@core/services/api.auth";

@Component({
  selector: 'ngx-reason-pie',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class ReasonPieComponent implements AfterViewInit, OnDestroy {
  reports: any[];
  reasons:any[];
  options: any = {};
  themeSubscription: any;
  dataPoints: any[];
  datalabels: any[];

  constructor(private theme: NbThemeService,private apiAuth: ApiAuth) {
    this.loadData(0,0);
  }

  loadData(userId,selectedMonth): void {
    try {
      this.reasons=[];
      this.datalabels=[];
      this.dataPoints=[];

      this.apiAuth.getAttendanceByReasonReport(selectedMonth,userId).subscribe(data => {
        this.reports = data.result;
        for (var j=0; j<this.reports.length; j++) {
          let payment = this.reports[j];
          console.log(payment.reasonDesc);
          this.datalabels.push(payment.reasonDesc);
          this.dataPoints.push(payment.totalHours);

          this.reasons.push({ value: payment.totalHours, name: payment.reasonDesc });
        }
        //this.source.load(data.result);
        console.log("done...");
        console.log(this.reasons);
        this.loadngAfterViewInit();
      });

    }
    catch (e) {
      console.log(e);
    }
  }

  ngAfterViewInit(){
    console.log("ngAfterViewInit");
  }

  loadngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.dangerLight, colors.successLight, colors.primaryLight,"#FFEA88","#FF8153","#4ACAB4","#878BB6"],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          //data: ['Muslim', 'Christian', 'Others'],
          data: this.reasons,
          textStyle: {
            color: echarts.textColor,
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: this.datalabels,
            // data: [ 'Jan',
            //   'Feb',
            //   'Mar',
            //   'Apr',
            //   'May',
            //   'Jun',
            //   'Jul',
            //   'Aug',
            //   'Sep',
            //   'Oct',
            //   'Nov',
            //   'Dec'],
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
            data: this.dataPoints,//[50, 5, 200, 334, 390, 330, 220],
          },
        ],

      };
    });
  }

  ngOnDestroy(): void {
    if(this.themeSubscription!=null)
    this.themeSubscription.unsubscribe();
  }
}
