import { CourseDetailsModule } from './course-details.module';

describe('CourseDetailsModule', () => {
  let courseDetailsModule: CourseDetailsModule;

  beforeEach(() => {
    courseDetailsModule = new CourseDetailsModule();
  });

  it('should create an instance', () => {
    expect(courseDetailsModule).toBeTruthy();
  });
});
