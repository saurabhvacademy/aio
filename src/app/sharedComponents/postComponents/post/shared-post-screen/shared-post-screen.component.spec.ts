import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedPostScreenComponent } from './shared-post-screen.component';

describe('SharedPostScreenComponent', () => {
  let component: SharedPostScreenComponent;
  let fixture: ComponentFixture<SharedPostScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedPostScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedPostScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
