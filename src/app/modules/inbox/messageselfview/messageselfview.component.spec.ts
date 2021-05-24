import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageselfviewComponent } from './messageselfview.component';

describe('MessageotherviewComponent', () => {
  let component: MessageselfviewComponent;
  let fixture: ComponentFixture<MessageselfviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageselfviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageselfviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
