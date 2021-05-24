import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseleftmenuComponent } from './courseleftmenu.component';

describe('CourseleftmenuComponent', () => {
  let component: CourseleftmenuComponent;
  let fixture: ComponentFixture<CourseleftmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseleftmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseleftmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
