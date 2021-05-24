import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitestreamsComponent } from './invitestreams.component';

describe('InvitestreamsComponent', () => {
  let component: InvitestreamsComponent;
  let fixture: ComponentFixture<InvitestreamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitestreamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitestreamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
