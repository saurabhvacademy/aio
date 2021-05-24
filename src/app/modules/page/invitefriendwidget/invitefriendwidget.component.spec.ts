import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitefriendwidgetComponent } from './invitefriendwidget.component';

describe('InvitefriendwidgetComponent', () => {
  let component: InvitefriendwidgetComponent;
  let fixture: ComponentFixture<InvitefriendwidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitefriendwidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitefriendwidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
