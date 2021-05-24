import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharelinkpostviewComponent } from './sharelinkpostview.component';

describe('SharelinkpostviewComponent', () => {
  let component: SharelinkpostviewComponent;
  let fixture: ComponentFixture<SharelinkpostviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharelinkpostviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharelinkpostviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
