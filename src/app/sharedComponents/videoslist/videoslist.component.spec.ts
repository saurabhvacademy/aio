import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { videoslistComponent } from './videoslist.component';

describe('videoslistComponent', () => {
  let component: videoslistComponent;
  let fixture: ComponentFixture<videoslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ videoslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(videoslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
