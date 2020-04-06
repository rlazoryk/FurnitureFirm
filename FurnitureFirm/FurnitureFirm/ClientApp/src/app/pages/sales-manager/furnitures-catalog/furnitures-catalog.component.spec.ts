import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FurnituresCatalogComponent } from './furnitures-catalog.component';

describe('FurnituresCatalogComponent', () => {
  let component: FurnituresCatalogComponent;
  let fixture: ComponentFixture<FurnituresCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FurnituresCatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FurnituresCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
