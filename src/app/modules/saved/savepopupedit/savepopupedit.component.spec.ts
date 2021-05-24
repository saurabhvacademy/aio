import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavepopupeditComponent } from './savepopupedit.component';

describe('SavepopupeditComponent', () => {
  let component: SavepopupeditComponent;
  let fixture: ComponentFixture<SavepopupeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavepopupeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavepopupeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
