import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedtruefalsepostComponent } from './sharedtruefalsepost.component';

describe('SharedtruefalsepostComponent', () => {
  let component: SharedtruefalsepostComponent;
  let fixture: ComponentFixture<SharedtruefalsepostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedtruefalsepostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedtruefalsepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
