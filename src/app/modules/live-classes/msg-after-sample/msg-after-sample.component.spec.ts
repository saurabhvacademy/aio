import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgAfterSampleComponent } from './msg-after-sample.component';

describe('MsgAfterSampleComponent', () => {
  let component: MsgAfterSampleComponent;
  let fixture: ComponentFixture<MsgAfterSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsgAfterSampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsgAfterSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
