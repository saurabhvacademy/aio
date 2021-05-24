import { ShowanswerpipeModule } from './showanswerpipe.module';

describe('ShowanswerpipeModule', () => {
  let showanswerpipeModule: ShowanswerpipeModule;

  beforeEach(() => {
    showanswerpipeModule = new ShowanswerpipeModule();
  });

  it('should create an instance', () => {
    expect(showanswerpipeModule).toBeTruthy();
  });
});
