import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedConnectionsComponent } from './suggested-connections.component';

describe('SuggestedConnectionsComponent', () => {
  let component: SuggestedConnectionsComponent;
  let fixture: ComponentFixture<SuggestedConnectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestedConnectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestedConnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
