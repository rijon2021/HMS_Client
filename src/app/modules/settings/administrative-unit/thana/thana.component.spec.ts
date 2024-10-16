/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ThanaComponent } from './thana.component';

describe('ThanaComponent', () => {
  let component: ThanaComponent;
  let fixture: ComponentFixture<ThanaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThanaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
