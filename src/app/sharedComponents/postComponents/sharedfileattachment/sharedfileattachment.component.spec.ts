import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedfileattachmentComponent } from './sharedfileattachment.component';

describe('SharedfileattachmentComponent', () => {
  let component: SharedfileattachmentComponent;
  let fixture: ComponentFixture<SharedfileattachmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedfileattachmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedfileattachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
