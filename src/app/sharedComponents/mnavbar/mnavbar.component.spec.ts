import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MnavbarComponent } from './mnavbar.component';

describe('MnavbarComponent', () => {
  let component: MnavbarComponent;
  let fixture: ComponentFixture<MnavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MnavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MnavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
