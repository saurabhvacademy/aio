import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharetextpostviewComponent } from './sharetextpostview.component';

describe('SharetextpostviewComponent', () => {
  let component: SharetextpostviewComponent;
  let fixture: ComponentFixture<SharetextpostviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharetextpostviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharetextpostviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
