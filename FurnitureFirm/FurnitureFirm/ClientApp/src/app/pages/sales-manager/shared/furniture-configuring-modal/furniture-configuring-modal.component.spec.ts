import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FurnitureConfiguringModalComponent } from './furniture-configuring-modal.component';

describe('FurnitureConfiguringModalComponent', () => {
  let component: FurnitureConfiguringModalComponent;
  let fixture: ComponentFixture<FurnitureConfiguringModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FurnitureConfiguringModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FurnitureConfiguringModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
