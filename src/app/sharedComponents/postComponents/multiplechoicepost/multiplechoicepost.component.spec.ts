import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplechoicepostComponent } from './multiplechoicepost.component';

describe('MultiplechoicepostComponent', () => {
  let component: MultiplechoicepostComponent;
  let fixture: ComponentFixture<MultiplechoicepostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiplechoicepostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiplechoicepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
