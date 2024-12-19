/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { StaffPositionComponent } from './staff-position.component';

describe('StaffPositionComponent', () => {
  let component: StaffPositionComponent;
  let fixture: ComponentFixture<StaffPositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffPositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
