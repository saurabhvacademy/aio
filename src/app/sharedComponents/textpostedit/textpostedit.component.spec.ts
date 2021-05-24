import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextposteditComponent } from './textpostedit.component';

describe('TextposteditComponent', () => {
  let component: TextposteditComponent;
  let fixture: ComponentFixture<TextposteditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextposteditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextposteditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
