import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstumtiomsTableComponent } from './constumtioms-table.component';

describe('ConstumtiomsTableComponent', () => {
  let component: ConstumtiomsTableComponent;
  let fixture: ComponentFixture<ConstumtiomsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConstumtiomsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstumtiomsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
