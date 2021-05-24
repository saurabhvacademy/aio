import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharescreensinglechoicepostComponent } from './sharescreensinglechoicepost.component';

describe('SharescreensinglechoicepostComponent', () => {
  let component: SharescreensinglechoicepostComponent;
  let fixture: ComponentFixture<SharescreensinglechoicepostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharescreensinglechoicepostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharescreensinglechoicepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
