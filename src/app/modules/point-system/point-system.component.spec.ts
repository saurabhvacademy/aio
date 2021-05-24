import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointSystemComponent } from './point-system.component';

describe('PointSystemComponent', () => {
  let component: PointSystemComponent;
  let fixture: ComponentFixture<PointSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
