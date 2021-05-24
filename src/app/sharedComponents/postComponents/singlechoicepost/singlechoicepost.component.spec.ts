import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglechoicepostComponent } from './singlechoicepost.component';

describe('SinglechoicepostComponent', () => {
  let component: SinglechoicepostComponent;
  let fixture: ComponentFixture<SinglechoicepostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglechoicepostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglechoicepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
