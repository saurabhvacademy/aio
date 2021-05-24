import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavepopupdeleteComponent } from './savepopupdelete.component';

describe('SavepopupdeleteComponent', () => {
  let component: SavepopupdeleteComponent;
  let fixture: ComponentFixture<SavepopupdeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavepopupdeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavepopupdeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
