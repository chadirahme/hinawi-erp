import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceMonthlyComponent } from './attendance-monthly.component';

describe('AttendanceMonthlyComponent', () => {
  let component: AttendanceMonthlyComponent;
  let fixture: ComponentFixture<AttendanceMonthlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceMonthlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceMonthlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
