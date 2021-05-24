import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesliderComponent } from './courseslider.component';

describe('CoursesliderComponent', () => {
  let component: CoursesliderComponent;
  let fixture: ComponentFixture<CoursesliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
