import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatefolderComponent } from './createfolder.component';

describe('CreatefolderComponent', () => {
  let component: CreatefolderComponent;
  let fixture: ComponentFixture<CreatefolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatefolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatefolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
