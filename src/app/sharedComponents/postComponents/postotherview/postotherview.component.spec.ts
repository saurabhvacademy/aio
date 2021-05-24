import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostotherviewComponent } from './postotherview.component';

describe('PostotherviewComponent', () => {
  let component: PostotherviewComponent;
  let fixture: ComponentFixture<PostotherviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostotherviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostotherviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
