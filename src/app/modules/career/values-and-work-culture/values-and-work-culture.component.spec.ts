import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValuesAndWorkCultureComponent } from './values-and-work-culture.component';

describe('ValuesAndWorkCultureComponent', () => {
  let component: ValuesAndWorkCultureComponent;
  let fixture: ComponentFixture<ValuesAndWorkCultureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValuesAndWorkCultureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValuesAndWorkCultureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
