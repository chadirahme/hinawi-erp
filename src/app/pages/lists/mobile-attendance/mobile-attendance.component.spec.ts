import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAttendanceComponent } from './mobile-attendance.component';

describe('MobileAttendanceComponent', () => {
  let component: MobileAttendanceComponent;
  let fixture: ComponentFixture<MobileAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
