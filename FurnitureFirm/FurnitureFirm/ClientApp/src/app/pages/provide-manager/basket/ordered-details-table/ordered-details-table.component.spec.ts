import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderedDetailsTableComponent } from './ordered-details-table.component';

describe('OrderedDetailsTableComponent', () => {
  let component: OrderedDetailsTableComponent;
  let fixture: ComponentFixture<OrderedDetailsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderedDetailsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderedDetailsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
