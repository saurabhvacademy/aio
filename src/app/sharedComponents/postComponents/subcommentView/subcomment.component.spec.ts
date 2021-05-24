import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcommentComponent } from './subcomment.component';

describe('SubcommentComponent', () => {
  let component: SubcommentComponent;
  let fixture: ComponentFixture<SubcommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
