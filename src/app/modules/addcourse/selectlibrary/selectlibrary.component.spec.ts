import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectlibraryComponent } from './selectlibrary.component';

describe('SelectlibraryComponent', () => {
  let component: SelectlibraryComponent;
  let fixture: ComponentFixture<SelectlibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectlibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectlibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
