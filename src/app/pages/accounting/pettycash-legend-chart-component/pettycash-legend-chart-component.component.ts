import {Component, Input} from '@angular/core';
import {NgxLegendItemColor} from "../../chartdashboard/legend-chart/enum.legend-item-color";

@Component({
  selector: 'pettycash-legend-chart-component',
  templateUrl: './pettycash-legend-chart-component.component.html',
  styleUrls: ['./pettycash-legend-chart-component.component.scss']
})
export class PettycashLegendChartComponentComponent  {

  /**
   * Take an array of legend items
   * Available iconColor: 'green', 'purple', 'light-purple', 'blue', 'yellow'
   * @type {{iconColor: string; title: string}[]}
   */
  @Input()
  legendItems: { iconColor: NgxLegendItemColor; title: string }[] = [];


}
