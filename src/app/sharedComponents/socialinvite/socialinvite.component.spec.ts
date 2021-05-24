import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialinviteComponent } from './socialinvite.component';

describe('SocialinviteComponent', () => {
  let component: SocialinviteComponent;
  let fixture: ComponentFixture<SocialinviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialinviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialinviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
