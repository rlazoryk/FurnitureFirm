import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderConfigureModalComponent } from './provider-configure-modal.component';

describe('ProviderConfigureModalComponent', () => {
  let component: ProviderConfigureModalComponent;
  let fixture: ComponentFixture<ProviderConfigureModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderConfigureModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderConfigureModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
