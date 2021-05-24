import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TruefalsepostComponent } from './truefalsepost.component';

describe('TruefalsepostComponent', () => {
  let component: TruefalsepostComponent;
  let fixture: ComponentFixture<TruefalsepostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TruefalsepostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TruefalsepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
