import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourinterestwidgetComponent } from './yourinterestwidget.component';

describe('YourinterestwidgetComponent', () => {
  let component: YourinterestwidgetComponent;
  let fixture: ComponentFixture<YourinterestwidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourinterestwidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourinterestwidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
