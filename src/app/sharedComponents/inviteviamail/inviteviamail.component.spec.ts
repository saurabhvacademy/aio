import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteviamailComponent } from './inviteviamail.component';

describe('InviteviamailComponent', () => {
  let component: InviteviamailComponent;
  let fixture: ComponentFixture<InviteviamailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteviamailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteviamailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
