import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseConfigureModalComponent } from './warehouse-configure-modal.component';

describe('WarehouseConfigureModalComponent', () => {
  let component: WarehouseConfigureModalComponent;
  let fixture: ComponentFixture<WarehouseConfigureModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseConfigureModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseConfigureModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
