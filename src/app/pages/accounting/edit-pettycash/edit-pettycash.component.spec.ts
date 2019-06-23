import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPettycashComponent } from './edit-pettycash.component';

describe('EditPettycashComponent', () => {
  let component: EditPettycashComponent;
  let fixture: ComponentFixture<EditPettycashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPettycashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPettycashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
