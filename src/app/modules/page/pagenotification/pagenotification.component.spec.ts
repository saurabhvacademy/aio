import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagenotificationComponent } from './pagenotification.component';

describe('PagenotificationComponent', () => {
  let component: PagenotificationComponent;
  let fixture: ComponentFixture<PagenotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagenotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagenotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
