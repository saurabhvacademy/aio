import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharelinkedinComponent } from './sharelinkedin.component';

describe('SharelinkedinComponent', () => {
  let component: SharelinkedinComponent;
  let fixture: ComponentFixture<SharelinkedinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharelinkedinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharelinkedinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
