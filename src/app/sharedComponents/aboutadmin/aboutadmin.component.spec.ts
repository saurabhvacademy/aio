import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutadminComponent } from './aboutadmin.component';

describe('AboutadminComponent', () => {
  let component: AboutadminComponent;
  let fixture: ComponentFixture<AboutadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
