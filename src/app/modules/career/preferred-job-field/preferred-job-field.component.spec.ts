import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferredJobFieldComponent } from './preferred-job-field.component';

describe('PreferredJobFieldComponent', () => {
  let component: PreferredJobFieldComponent;
  let fixture: ComponentFixture<PreferredJobFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferredJobFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferredJobFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
