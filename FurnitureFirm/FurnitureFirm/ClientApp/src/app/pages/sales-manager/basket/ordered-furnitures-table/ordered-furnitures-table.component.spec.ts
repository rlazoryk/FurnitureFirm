import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderedFurnituresTableComponent } from './ordered-furnitures-table.component';

describe('OrderedFurnituresTableComponent', () => {
  let component: OrderedFurnituresTableComponent;
  let fixture: ComponentFixture<OrderedFurnituresTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderedFurnituresTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderedFurnituresTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
