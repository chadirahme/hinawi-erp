import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectiveListComponent } from './prospective-list.component';

describe('ProspectiveListComponent', () => {
  let component: ProspectiveListComponent;
  let fixture: ComponentFixture<ProspectiveListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProspectiveListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProspectiveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
