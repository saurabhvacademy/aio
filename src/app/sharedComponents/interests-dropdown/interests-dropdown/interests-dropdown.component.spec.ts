import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestsDropdownComponent } from './interests-dropdown.component';

describe('InterestsDropdownComponent', () => {
  let component: InterestsDropdownComponent;
  let fixture: ComponentFixture<InterestsDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterestsDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestsDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
