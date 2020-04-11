import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionsTableComponent } from './productions-table.component';

describe('ProductionsTableComponent', () => {
  let component: ProductionsTableComponent;
  let fixture: ComponentFixture<ProductionsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
