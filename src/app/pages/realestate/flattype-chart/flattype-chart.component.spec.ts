import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlattypeChartComponent } from './flattype-chart.component';

describe('FlattypeChartComponent', () => {
  let component: FlattypeChartComponent;
  let fixture: ComponentFixture<FlattypeChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlattypeChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlattypeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
