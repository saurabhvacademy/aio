import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedmultiplechoicepostComponent } from './sharedmultiplechoicepost.component';

describe('SharedmultiplechoicepostComponent', () => {
  let component: SharedmultiplechoicepostComponent;
  let fixture: ComponentFixture<SharedmultiplechoicepostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedmultiplechoicepostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedmultiplechoicepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
