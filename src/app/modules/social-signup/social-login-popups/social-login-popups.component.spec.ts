import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialLoginPopupsComponent } from './social-login-popups.component';

describe('SocialLoginPopupsComponent', () => {
  let component: SocialLoginPopupsComponent;
  let fixture: ComponentFixture<SocialLoginPopupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialLoginPopupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialLoginPopupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
