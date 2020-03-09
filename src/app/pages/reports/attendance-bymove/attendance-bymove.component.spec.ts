import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceBymoveComponent } from './attendance-bymove.component';

describe('AttendanceBymoveComponent', () => {
  let component: AttendanceBymoveComponent;
  let fixture: ComponentFixture<AttendanceBymoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceBymoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceBymoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
