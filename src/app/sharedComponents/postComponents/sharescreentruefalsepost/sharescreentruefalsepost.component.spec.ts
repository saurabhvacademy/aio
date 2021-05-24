import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharescreentruefalsepostComponent } from './sharescreentruefalsepost.component';

describe('SharescreentruefalsepostComponent', () => {
  let component: SharescreentruefalsepostComponent;
  let fixture: ComponentFixture<SharescreentruefalsepostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharescreentruefalsepostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharescreentruefalsepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
