import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportConfiguringModalComponent } from './transport-configuring-modal.component';

describe('TransportConfiguringModalComponent', () => {
  let component: TransportConfiguringModalComponent;
  let fixture: ComponentFixture<TransportConfiguringModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportConfiguringModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportConfiguringModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
