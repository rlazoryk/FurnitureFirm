import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComingsTableComponent } from './comings-table.component';

describe('ComingsTableComponent', () => {
  let component: ComingsTableComponent;
  let fixture: ComponentFixture<ComingsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComingsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComingsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
