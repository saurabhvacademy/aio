import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharescreenmultiplechoicepostComponent } from './sharescreenmultiplechoicepost.component';

describe('SharescreenmultiplechoicepostComponent', () => {
  let component: SharescreenmultiplechoicepostComponent;
  let fixture: ComponentFixture<SharescreenmultiplechoicepostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharescreenmultiplechoicepostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharescreenmultiplechoicepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
