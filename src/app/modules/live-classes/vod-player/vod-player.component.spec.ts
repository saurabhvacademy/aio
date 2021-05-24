import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VodPlayerComponent } from './vod-player.component';

describe('VodPlayerComponent', () => {
  let component: VodPlayerComponent;
  let fixture: ComponentFixture<VodPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VodPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VodPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
