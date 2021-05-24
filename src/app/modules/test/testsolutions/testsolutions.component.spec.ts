import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsolutionsComponent } from './testsolutions.component';

describe('TestsolutionsComponent', () => {
  let component: TestsolutionsComponent;
  let fixture: ComponentFixture<TestsolutionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsolutionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsolutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
