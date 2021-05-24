import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedpopupComponent } from './savedpopup.component';

describe('SavedpopupComponent', () => {
  let component: SavedpopupComponent;
  let fixture: ComponentFixture<SavedpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
