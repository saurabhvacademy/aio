import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountprogressComponent } from './accountprogress.component';

describe('AccountprogressComponent', () => {
  let component: AccountprogressComponent;
  let fixture: ComponentFixture<AccountprogressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountprogressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountprogressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
