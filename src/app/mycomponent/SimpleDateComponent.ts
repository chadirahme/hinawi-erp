import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-simple-date',
  template: `{{value |date: 'dd.MM.yyyy'}}`,
})
export class SimpleDateComponent {
  @Input() value: Date;
}
