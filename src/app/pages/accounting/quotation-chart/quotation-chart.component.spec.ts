import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationChartComponent } from './quotation-chart.component';

describe('QuotationChartComponent', () => {
  let component: QuotationChartComponent;
  let fixture: ComponentFixture<QuotationChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
