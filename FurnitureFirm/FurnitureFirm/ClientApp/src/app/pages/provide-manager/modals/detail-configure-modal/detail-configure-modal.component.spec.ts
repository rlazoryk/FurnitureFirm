import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailConfigureModalComponent } from './detail-configure-modal.component';

describe('DetailConfigureModalComponent', () => {
  let component: DetailConfigureModalComponent;
  let fixture: ComponentFixture<DetailConfigureModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailConfigureModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailConfigureModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
