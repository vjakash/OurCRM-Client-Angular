import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddservicerequestsComponent } from './addservicerequests.component';

describe('AddservicerequestsComponent', () => {
  let component: AddservicerequestsComponent;
  let fixture: ComponentFixture<AddservicerequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddservicerequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddservicerequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
