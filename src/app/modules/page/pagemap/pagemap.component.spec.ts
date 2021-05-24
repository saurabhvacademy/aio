import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagemapComponent } from './pagemap.component';

describe('PagemapComponent', () => {
  let component: PagemapComponent;
  let fixture: ComponentFixture<PagemapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagemapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagemapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
