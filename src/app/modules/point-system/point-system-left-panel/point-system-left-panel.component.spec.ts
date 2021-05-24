import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointSystemLeftPanelComponent } from './point-system-left-panel.component';

describe('PointSystemLeftPanelComponent', () => {
  let component: PointSystemLeftPanelComponent;
  let fixture: ComponentFixture<PointSystemLeftPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointSystemLeftPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointSystemLeftPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
