import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextpostComponent } from './textpost.component';

describe('TextpostComponent', () => {
  let component: TextpostComponent;
  let fixture: ComponentFixture<TextpostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextpostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
