import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideopostComponent } from './videopost.component';

describe('VideopostComponent', () => {
  let component: VideopostComponent;
  let fixture: ComponentFixture<VideopostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideopostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideopostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
