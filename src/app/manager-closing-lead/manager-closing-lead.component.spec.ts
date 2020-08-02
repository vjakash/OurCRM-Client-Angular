import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerClosingLeadComponent } from './manager-closing-lead.component';

describe('ManagerClosingLeadComponent', () => {
  let component: ManagerClosingLeadComponent;
  let fixture: ComponentFixture<ManagerClosingLeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerClosingLeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerClosingLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
