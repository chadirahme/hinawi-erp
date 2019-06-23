import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CucComponent } from './cuc.component';

describe('CucComponent', () => {
  let component: CucComponent;
  let fixture: ComponentFixture<CucComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CucComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
