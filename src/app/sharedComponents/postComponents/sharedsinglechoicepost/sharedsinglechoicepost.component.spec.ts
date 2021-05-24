import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedsinglechoicepostComponent } from './sharedsinglechoicepost.component';

describe('SharedsinglechoicepostComponent', () => {
  let component: SharedsinglechoicepostComponent;
  let fixture: ComponentFixture<SharedsinglechoicepostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedsinglechoicepostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedsinglechoicepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
