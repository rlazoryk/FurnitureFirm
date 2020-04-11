import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehousesDetailsComponent } from './warehouses-details.component';

describe('WarehousesDetailsComponent', () => {
  let component: WarehousesDetailsComponent;
  let fixture: ComponentFixture<WarehousesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehousesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehousesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
