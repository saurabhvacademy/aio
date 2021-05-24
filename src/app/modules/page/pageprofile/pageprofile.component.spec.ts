import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageprofileComponent } from './pageprofile.component';

describe('PageprofileComponent', () => {
  let component: PageprofileComponent;
  let fixture: ComponentFixture<PageprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
