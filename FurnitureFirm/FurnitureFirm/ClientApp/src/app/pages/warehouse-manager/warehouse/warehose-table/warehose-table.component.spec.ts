import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehoseTableComponent } from './warehose-table.component';

describe('WarehoseTableComponent', () => {
  let component: WarehoseTableComponent;
  let fixture: ComponentFixture<WarehoseTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehoseTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehoseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
