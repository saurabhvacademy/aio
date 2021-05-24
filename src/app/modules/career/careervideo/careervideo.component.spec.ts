import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareervideoComponent } from './careervideo.component';

describe('CareervideoComponent', () => {
  let component: CareervideoComponent;
  let fixture: ComponentFixture<CareervideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareervideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareervideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
