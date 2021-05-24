import { TestRoutingModule } from './test-routing.module';

describe('TestRoutingModule', () => {
  let testRoutingModule: TestRoutingModule;

  beforeEach(() => {
    testRoutingModule = new TestRoutingModule();
  });

  it('should create an instance', () => {
    expect(testRoutingModule).toBeTruthy();
  });
});
