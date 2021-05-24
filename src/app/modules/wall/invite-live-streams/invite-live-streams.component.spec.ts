import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteLiveStreamsComponent } from './invite-live-streams.component';

describe('InviteLiveStreamsComponent', () => {
  let component: InviteLiveStreamsComponent;
  let fixture: ComponentFixture<InviteLiveStreamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteLiveStreamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteLiveStreamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
