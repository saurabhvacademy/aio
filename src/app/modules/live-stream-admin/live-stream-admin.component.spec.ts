import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveStreamAdminComponent } from './live-stream-admin.component';

describe('LiveStreamAdminComponent', () => {
  let component: LiveStreamAdminComponent;
  let fixture: ComponentFixture<LiveStreamAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveStreamAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveStreamAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
