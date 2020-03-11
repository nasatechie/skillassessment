import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddskilltechComponent } from './addskilltech.component';

describe('AddskilltechComponent', () => {
  let component: AddskilltechComponent;
  let fixture: ComponentFixture<AddskilltechComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddskilltechComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddskilltechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
