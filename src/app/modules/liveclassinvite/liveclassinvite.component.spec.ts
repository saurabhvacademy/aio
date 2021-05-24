import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveclassinviteComponent } from './liveclassinvite.component';

describe('LiveclassinviteComponent', () => {
  let component: LiveclassinviteComponent;
  let fixture: ComponentFixture<LiveclassinviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveclassinviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveclassinviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
