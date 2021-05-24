import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedPostComponent } from './shared-post.component';

describe('SharedPostComponent', () => {
  let component: SharedPostComponent;
  let fixture: ComponentFixture<SharedPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
