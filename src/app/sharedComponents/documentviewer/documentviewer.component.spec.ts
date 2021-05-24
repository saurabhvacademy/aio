import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentviewerComponent } from './documentviewer.component';

describe('DocumentviewerComponent', () => {
  let component: DocumentviewerComponent;
  let fixture: ComponentFixture<DocumentviewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentviewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
