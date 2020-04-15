import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerConfiguringComponent } from './worker-configuring.component';

describe('WorkerConfiguringComponent', () => {
  let component: WorkerConfiguringComponent;
  let fixture: ComponentFixture<WorkerConfiguringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerConfiguringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerConfiguringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
