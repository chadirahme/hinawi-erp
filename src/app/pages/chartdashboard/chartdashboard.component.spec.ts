import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartdashboardComponent } from './chartdashboard.component';

describe('ChartdashboardComponent', () => {
  let component: ChartdashboardComponent;
  let fixture: ComponentFixture<ChartdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
