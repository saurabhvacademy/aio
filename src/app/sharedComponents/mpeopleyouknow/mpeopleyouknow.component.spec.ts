import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpeopleyouknowComponent } from './mpeopleyouknow.component';

describe('MpeopleyouknowComponent', () => {
  let component: MpeopleyouknowComponent;
  let fixture: ComponentFixture<MpeopleyouknowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpeopleyouknowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpeopleyouknowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
