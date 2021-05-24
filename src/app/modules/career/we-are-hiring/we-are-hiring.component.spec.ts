import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeAreHiringComponent } from './we-are-hiring.component';

describe('WeAreHiringComponent', () => {
  let component: WeAreHiringComponent;
  let fixture: ComponentFixture<WeAreHiringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeAreHiringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeAreHiringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
