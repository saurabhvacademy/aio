import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilefilterComponent } from './profilefilter.component';

describe('ProfilefilterComponent', () => {
  let component: ProfilefilterComponent;
  let fixture: ComponentFixture<ProfilefilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilefilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilefilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
