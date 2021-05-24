import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MmenuComponent } from './mmenu.component';

describe('MmenuComponent', () => {
  let component: MmenuComponent;
  let fixture: ComponentFixture<MmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
