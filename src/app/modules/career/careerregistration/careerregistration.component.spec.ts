import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerregistrationComponent } from './careerregistration.component';

describe('CareerregistrationComponent', () => {
  let component: CareerregistrationComponent;
  let fixture: ComponentFixture<CareerregistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareerregistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
