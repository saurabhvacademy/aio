import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedpostComponent } from './sharedpost.component';

describe('SharedpostComponent', () => {
  let component: SharedpostComponent;
  let fixture: ComponentFixture<SharedpostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedpostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
