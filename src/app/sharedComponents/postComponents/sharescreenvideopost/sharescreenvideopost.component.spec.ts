import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharescreenvideopostComponent } from './sharescreenvideopost.component';

describe('SharescreenvideopostComponent', () => {
  let component: SharescreenvideopostComponent;
  let fixture: ComponentFixture<SharescreenvideopostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharescreenvideopostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharescreenvideopostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
