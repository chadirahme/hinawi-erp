import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCucComponent } from './edit-cuc.component';

describe('EditCucComponent', () => {
  let component: EditCucComponent;
  let fixture: ComponentFixture<EditCucComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCucComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
