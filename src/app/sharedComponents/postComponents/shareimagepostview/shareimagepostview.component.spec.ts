import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareimagepostviewComponent } from './shareimagepostview.component';

describe('ShareimagepostviewComponent', () => {
  let component: ShareimagepostviewComponent;
  let fixture: ComponentFixture<ShareimagepostviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareimagepostviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareimagepostviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
