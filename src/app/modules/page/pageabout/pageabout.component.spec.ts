import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageaboutComponent } from './pageabout.component';

describe('PageaboutComponent', () => {
  let component: PageaboutComponent;
  let fixture: ComponentFixture<PageaboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageaboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageaboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
