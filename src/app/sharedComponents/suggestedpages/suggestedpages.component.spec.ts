import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedpagesComponent } from './suggestedpages.component';

describe('SuggestedpagesComponent', () => {
  let component: SuggestedpagesComponent;
  let fixture: ComponentFixture<SuggestedpagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestedpagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestedpagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
