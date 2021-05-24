import { LivestreamModule } from './livestream.module';

describe('LivestreamModule', () => {
  let livestreamModule: LivestreamModule;

  beforeEach(() => {
    livestreamModule = new LivestreamModule();
  });

  it('should create an instance', () => {
    expect(livestreamModule).toBeTruthy();
  });
});
