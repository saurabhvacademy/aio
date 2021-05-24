import { CreatecourseandpagewidgetModule } from './createcourseandpagewidget.module';

describe('CreatecourseandpagewidgetModule', () => {
  let createcourseandpagewidgetModule: CreatecourseandpagewidgetModule;

  beforeEach(() => {
    createcourseandpagewidgetModule = new CreatecourseandpagewidgetModule();
  });

  it('should create an instance', () => {
    expect(createcourseandpagewidgetModule).toBeTruthy();
  });
});
