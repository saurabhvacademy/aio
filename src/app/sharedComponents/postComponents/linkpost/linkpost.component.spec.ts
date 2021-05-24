import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkpostComponent } from './linkpost.component';

describe('LinkpostComponent', () => {
  let component: LinkpostComponent;
  let fixture: ComponentFixture<LinkpostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkpostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
