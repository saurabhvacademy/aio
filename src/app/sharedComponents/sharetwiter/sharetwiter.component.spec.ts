import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharetwiterComponent } from './sharetwiter.component';

describe('SharetwiterComponent', () => {
  let component: SharetwiterComponent;
  let fixture: ComponentFixture<SharetwiterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharetwiterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharetwiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
