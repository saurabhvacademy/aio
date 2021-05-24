import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursereferenceComponent } from './coursereference.component';

describe('CoursereferenceComponent', () => {
  let component: CoursereferenceComponent;
  let fixture: ComponentFixture<CoursereferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursereferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursereferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
