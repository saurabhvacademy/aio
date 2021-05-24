import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagepostComponent } from './imagepost.component';

describe('ImagepostComponent', () => {
  let component: ImagepostComponent;
  let fixture: ComponentFixture<ImagepostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagepostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
