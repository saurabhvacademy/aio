import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedimagepostComponent } from './sharedimagepost.component';

describe('SharedimagepostComponent', () => {
  let component: SharedimagepostComponent;
  let fixture: ComponentFixture<SharedimagepostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedimagepostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedimagepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
