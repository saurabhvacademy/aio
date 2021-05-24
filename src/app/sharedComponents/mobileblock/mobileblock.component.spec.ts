import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileblockComponent } from './mobileblock.component';

describe('MobileblockComponent', () => {
  let component: MobileblockComponent;
  let fixture: ComponentFixture<MobileblockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileblockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileblockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
