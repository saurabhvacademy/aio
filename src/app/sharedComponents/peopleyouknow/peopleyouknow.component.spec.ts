import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleyouknowComponent } from './peopleyouknow.component';

describe('PeopleyouknowComponent', () => {
  let component: PeopleyouknowComponent;
  let fixture: ComponentFixture<PeopleyouknowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleyouknowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleyouknowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
