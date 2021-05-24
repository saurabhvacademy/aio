import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileVisitorsPageComponent } from './profile-visitors-page.component';

describe('ProfileVisitorsPageComponent', () => {
  let component: ProfileVisitorsPageComponent;
  let fixture: ComponentFixture<ProfileVisitorsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileVisitorsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileVisitorsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
