import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedPagesComponent } from './suggested-pages.component';

describe('SuggestedPagesComponent', () => {
  let component: SuggestedPagesComponent;
  let fixture: ComponentFixture<SuggestedPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestedPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestedPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
