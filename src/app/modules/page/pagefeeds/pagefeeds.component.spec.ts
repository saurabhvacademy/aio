import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagefeedsComponent } from './pagefeeds.component';

describe('PagefeedsComponent', () => {
  let component: PagefeedsComponent;
  let fixture: ComponentFixture<PagefeedsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagefeedsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagefeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
