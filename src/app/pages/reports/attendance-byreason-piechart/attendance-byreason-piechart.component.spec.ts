import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceByreasonPiechartComponent } from './attendance-byreason-piechart.component';

describe('AttendanceByreasonPiechartComponent', () => {
  let component: AttendanceByreasonPiechartComponent;
  let fixture: ComponentFixture<AttendanceByreasonPiechartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceByreasonPiechartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceByreasonPiechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
