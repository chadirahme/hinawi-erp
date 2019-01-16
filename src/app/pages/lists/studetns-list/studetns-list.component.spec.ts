import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudetnsListComponent } from './studetns-list.component';

describe('StudetnsListComponent', () => {
  let component: StudetnsListComponent;
  let fixture: ComponentFixture<StudetnsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudetnsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudetnsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
