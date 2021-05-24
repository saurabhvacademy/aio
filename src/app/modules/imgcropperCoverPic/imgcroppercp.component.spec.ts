import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgcroppercpComponent } from './imgcroppercp.component';

describe('ImgcropperComponent', () => {
  let component: ImgcroppercpComponent;
  let fixture: ComponentFixture<ImgcroppercpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgcroppercpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgcroppercpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
