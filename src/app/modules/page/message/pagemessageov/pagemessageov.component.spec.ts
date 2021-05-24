import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagemessageovComponent } from './pagemessageov.component';

describe('PagemessageovComponent', () => {
  let component: PagemessageovComponent;
  let fixture: ComponentFixture<PagemessageovComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagemessageovComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagemessageovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
