import { AddquizModule } from './addquiz.module';

describe('AddquizModule', () => {
  let addquizModule: AddquizModule;

  beforeEach(() => {
    addquizModule = new AddquizModule();
  });

  it('should create an instance', () => {
    expect(addquizModule).toBeTruthy();
  });
});
