import { AddquizRoutingModule } from './addquiz-routing.module';

describe('AddquizRoutingModule', () => {
  let addquizRoutingModule: AddquizRoutingModule;

  beforeEach(() => {
    addquizRoutingModule = new AddquizRoutingModule();
  });

  it('should create an instance', () => {
    expect(addquizRoutingModule).toBeTruthy();
  });
});
