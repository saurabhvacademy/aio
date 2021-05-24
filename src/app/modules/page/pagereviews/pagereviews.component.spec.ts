import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagereviewsComponent } from './pagereviews.component';

describe('PagereviewsComponent', () => {
  let component: PagereviewsComponent;
  let fixture: ComponentFixture<PagereviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagereviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagereviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
