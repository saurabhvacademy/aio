import { AddcourseRoutingModule } from './addcourse-routing.module';

describe('AddcourseRoutingModule', () => {
  let addcourseRoutingModule: AddcourseRoutingModule;

  beforeEach(() => {
    addcourseRoutingModule = new AddcourseRoutingModule();
  });

  it('should create an instance', () => {
    expect(addcourseRoutingModule).toBeTruthy();
  });
});
