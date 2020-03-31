import {Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import {NbThemeService} from "@nebular/theme";
import {ApiAuth} from "../../../@core/services/api.auth";

@Component({
  selector: 'attendance-byreason-piechart',
  templateUrl: './attendance-byreason-piechart.component.html',
  styleUrls: ['./attendance-byreason-piechart.component.scss']
})
export class AttendanceByreasonPiechartComponent implements AfterViewInit, OnDestroy{

  reports: any[];
  reasons:any[];
  options: any = {};
  themeSubscription: any;

  // test(userId) {
  //   console.log('this is a test');
  //   this.loadData(userId);
  // }

  constructor(private theme: NbThemeService,private apiAuth: ApiAuth) {
    this.loadData(0,0,0);
  }

  loadData(userId,selectedMonth,start): void {
    try {
      this.reasons=[];
      this.apiAuth.getAttendanceByReasonDailyReport(selectedMonth,userId,start).subscribe(data => {
        this.reports = data.result;
        for (var j=0; j<this.reports.length; j++) {
          let payment = this.reports[j];
          console.log(payment.reasonDesc);
          //this.reasons.push({ value: payment.totalHours, name: payment.reasonDesc });
          this.reasons.push({ value: payment.totalHours * 60 + payment.totalMinutes, name: payment.reasonDesc });

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
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
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
        series: [
          {
            name: 'Reason',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            data: this.reasons,
            // data: [
            //   { value: 70, name: 'Muslim' },
            //   { value: 20, name: 'Christian' },
            //   { value: 10, name: 'Others' },
            // ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: echarts.itemHoverShadowColor,
              },
            },
            label: {
              normal: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
            },
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
