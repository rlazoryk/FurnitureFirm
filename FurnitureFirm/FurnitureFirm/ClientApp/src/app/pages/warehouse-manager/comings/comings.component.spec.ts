import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComingsComponent } from './comings.component';

describe('ComingsComponent', () => {
  let component: ComingsComponent;
  let fixture: ComponentFixture<ComingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
