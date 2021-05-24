import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitewidgetComponent } from './invitewidget.component';

describe('InvitewidgetComponent', () => {
  let component: InvitewidgetComponent;
  let fixture: ComponentFixture<InvitewidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitewidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitewidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
