import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopThreeDisplayComponent } from './top-three-display.component';

describe('TopThreeDisplayComponent', () => {
  let component: TopThreeDisplayComponent;
  let fixture: ComponentFixture<TopThreeDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopThreeDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopThreeDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
