import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceByreasonComponent } from './attendance-byreason.component';

describe('AttendanceByreasonComponent', () => {
  let component: AttendanceByreasonComponent;
  let fixture: ComponentFixture<AttendanceByreasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceByreasonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceByreasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
