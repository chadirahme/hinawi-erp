import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PettycashLegendChartComponentComponent } from './pettycash-legend-chart-component.component';

describe('PettycashLegendChartComponentComponent', () => {
  let component: PettycashLegendChartComponentComponent;
  let fixture: ComponentFixture<PettycashLegendChartComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PettycashLegendChartComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PettycashLegendChartComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
