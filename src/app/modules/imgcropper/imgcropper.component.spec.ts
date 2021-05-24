import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgcropperComponent } from './imgcropper.component';

describe('ImgcropperComponent', () => {
  let component: ImgcropperComponent;
  let fixture: ComponentFixture<ImgcropperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgcropperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgcropperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
