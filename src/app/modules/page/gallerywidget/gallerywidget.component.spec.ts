import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GallerywidgetComponent } from './gallerywidget.component';

describe('GallerywidgetComponent', () => {
  let component: GallerywidgetComponent;
  let fixture: ComponentFixture<GallerywidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GallerywidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GallerywidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
