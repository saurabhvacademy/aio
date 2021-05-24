import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileattachmentpostComponent } from './fileattachmentpost.component';

describe('FileattachmentpostComponent', () => {
  let component: FileattachmentpostComponent;
  let fixture: ComponentFixture<FileattachmentpostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileattachmentpostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileattachmentpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
