import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DpzComponent } from './dpz.component';

describe('DpzComponent', () => {
  let component: DpzComponent;
  let fixture: ComponentFixture<DpzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DpzComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DpzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
