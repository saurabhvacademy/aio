import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedlinkpostComponent } from './sharedlinkpost.component';

describe('SharedlinkpostComponent', () => {
  let component: SharedlinkpostComponent;
  let fixture: ComponentFixture<SharedlinkpostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedlinkpostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedlinkpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
