import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProspectiveComponent } from './edit-prospective.component';

describe('EditProspectiveComponent', () => {
  let component: EditProspectiveComponent;
  let fixture: ComponentFixture<EditProspectiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProspectiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProspectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
