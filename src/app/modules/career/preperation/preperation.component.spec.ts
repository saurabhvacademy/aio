import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreperationComponent } from './preperation.component';

describe('PreperationComponent', () => {
  let component: PreperationComponent;
  let fixture: ComponentFixture<PreperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
