import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualifierTestSyllabusComponent } from './qualifier-test-syllabus.component';

describe('QualifierTestSyllabusComponent', () => {
  let component: QualifierTestSyllabusComponent;
  let fixture: ComponentFixture<QualifierTestSyllabusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualifierTestSyllabusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualifierTestSyllabusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
