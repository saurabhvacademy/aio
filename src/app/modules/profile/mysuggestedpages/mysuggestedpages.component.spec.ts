import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MysuggestedpagesComponent } from './mysuggestedpages.component';

describe('MysuggestedpagesComponent', () => {
  let component: MysuggestedpagesComponent;
  let fixture: ComponentFixture<MysuggestedpagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MysuggestedpagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MysuggestedpagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
