import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageotherviewComponent } from './messageotherview.component';

describe('MessageotherviewComponent', () => {
  let component: MessageotherviewComponent;
  let fixture: ComponentFixture<MessageotherviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageotherviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageotherviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
