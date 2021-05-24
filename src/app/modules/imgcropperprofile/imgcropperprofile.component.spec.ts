import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgcropperprofileComponent } from './imgcropperprofile.component';

describe('ImgcropperprofileComponent', () => {
  let component: ImgcropperprofileComponent;
  let fixture: ComponentFixture<ImgcropperprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgcropperprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgcropperprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
