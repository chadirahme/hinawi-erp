import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavdashboardComponent } from './favdashboard.component';

describe('FavdashboardComponent', () => {
  let component: FavdashboardComponent;
  let fixture: ComponentFixture<FavdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
