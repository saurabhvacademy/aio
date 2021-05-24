import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagemessagesvComponent } from './pagemessagesv.component';

describe('PagemessagesvComponent', () => {
  let component: PagemessagesvComponent;
  let fixture: ComponentFixture<PagemessagesvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagemessagesvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagemessagesvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
