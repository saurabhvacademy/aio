import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharescreencoursepostviewComponent } from './sharescreencoursepostview.component';

describe('SharescreencoursepostviewComponent', () => {
  let component: SharescreencoursepostviewComponent;
  let fixture: ComponentFixture<SharescreencoursepostviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharescreencoursepostviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharescreencoursepostviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
