import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkloginpopupComponent } from './linkloginpopup.component';

describe('LinkloginpopupComponent', () => {
  let component: LinkloginpopupComponent;
  let fixture: ComponentFixture<LinkloginpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkloginpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkloginpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
