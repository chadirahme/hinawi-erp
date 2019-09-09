import {Component, OnDestroy} from '@angular/core';
import {NbThemeService, NbColorHelper} from "@nebular/theme";

@Component({
  selector: 'monthly-sales-chart',
  templateUrl: './monthly-sales-chart.component.html',
  styleUrls: ['./monthly-sales-chart.component.scss']
})
export class MonthlySalesChartComponent implements OnDestroy {

  //https://canvasjs.com/jquery-charts/column-line-area-chart/
  data: any;
  options: any;
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          data: [65000, 59000, 80000, 81000, 56000, 55000, 40000],
          label: 'Actual Sales',
          backgroundColor: NbColorHelper.hexToRgbA(colors.primary, 0.3),
          borderColor: colors.primary,
        }, {
          data: [28000, 48000, 40000, 19000, 86000, 27000, 90000],
          label: 'Expected Sales',
          backgroundColor: NbColorHelper.hexToRgbA(colors.danger, 0.3),
          borderColor: colors.danger,
        }, {
          data: [18000, 48000, 77000, 9000, 100000, 27000, 40000],
          label: 'Profit',
          backgroundColor: NbColorHelper.hexToRgbA(colors.info, 0.3),
          borderColor: colors.info,
          type: 'line'
        },
        ],
      };

      this.options = {
        //responsive: true,
        //maintainAspectRatio: false,
        title: {
          display: true,
          text: 'Monthly Sales Chart'
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
                display: false,
               // drawBorder: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
                callback: function(label, index, labels) {
                  return label/1000+'k';
                }
              },
              scaleLabel: {
                display: true,
                labelString: '1k = 1000'
              },
            },
          ],
        },
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
      };


    });
  }

   toggleDataSeries(e) {
  if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
    e.dataSeries.visible = false;
  } else {
    e.dataSeries.visible = true;
  }
  e.chart.render();
}

  // addSymbols(e) {
  //   var suffixes = ["", "K", "M", "B"];
  //   var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
  //
  //   if (order > suffixes.length - 1)
  //     order = suffixes.length - 1;
  //
  //   var suffix = suffixes[order];
  //   return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
  // }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}

