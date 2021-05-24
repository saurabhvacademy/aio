import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileVisitorsWidgetComponent } from './profile-visitors-widget.component';

describe('ProfileVisitorsWidgetComponent', () => {
  let component: ProfileVisitorsWidgetComponent;
  let fixture: ComponentFixture<ProfileVisitorsWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileVisitorsWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileVisitorsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
