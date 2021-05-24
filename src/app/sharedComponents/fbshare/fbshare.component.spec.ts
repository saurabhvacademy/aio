import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FbshareComponent } from './fbshare.component';

describe('FbshareComponent', () => {
  let component: FbshareComponent;
  let fixture: ComponentFixture<FbshareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FbshareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FbshareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
