import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageaboutwidgetComponent } from './pageaboutwidget.component';

describe('PageaboutwidgetComponent', () => {
  let component: PageaboutwidgetComponent;
  let fixture: ComponentFixture<PageaboutwidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageaboutwidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageaboutwidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
