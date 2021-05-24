import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcominglivestreamsComponent } from './upcominglivestreams.component';

describe('UpcominglivestreamsComponent', () => {
  let component: UpcominglivestreamsComponent;
  let fixture: ComponentFixture<UpcominglivestreamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcominglivestreamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcominglivestreamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
