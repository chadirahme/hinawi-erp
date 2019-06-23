import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PettycashEchartsBarComponent } from './pettycash-echarts-bar.component';

describe('PettycashEchartsBarComponent', () => {
  let component: PettycashEchartsBarComponent;
  let fixture: ComponentFixture<PettycashEchartsBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PettycashEchartsBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PettycashEchartsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
