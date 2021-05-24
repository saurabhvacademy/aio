import { AddcourseModule } from './addcourse.module';

describe('AddcourseModule', () => {
  let addcourseModule: AddcourseModule;

  beforeEach(() => {
    addcourseModule = new AddcourseModule();
  });

  it('should create an instance', () => {
    expect(addcourseModule).toBeTruthy();
  });
});
