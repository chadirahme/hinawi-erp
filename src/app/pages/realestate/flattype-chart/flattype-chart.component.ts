import {Component, OnDestroy, AfterViewInit} from '@angular/core';
import {NbThemeService} from "@nebular/theme";

@Component({
  selector: 'flattype-chart',
  templateUrl: './flattype-chart.component.html',
  styleUrls: ['./flattype-chart.component.scss']
})
export class FlattypeChartComponent implements AfterViewInit, OnDestroy {

  options: any = {};
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      //Residence , Shop, Villa ,Flat
      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['Residence', 'Shop', 'Villa', 'Flat'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        series: [
          {
            name: 'Flat Type',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            data: [
              { value: 335, name: 'Shop' },
              { value: 310, name: 'Villa' },
              { value: 234, name: 'Flat' },
              // { value: 135, name: 'Russia' },
              { value: 1548, name: 'Residence' },
            ],
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
    this.themeSubscription.unsubscribe();
  }

}
