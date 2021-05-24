import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharescreenfileattachmentComponent } from './sharescreenfileattachment.component';

describe('SharescreenfileattachmentComponent', () => {
  let component: SharescreenfileattachmentComponent;
  let fixture: ComponentFixture<SharescreenfileattachmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharescreenfileattachmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharescreenfileattachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
