import { LivestreamRoutingModule } from './livestream-routing.module';

describe('LivestreamRoutingModule', () => {
  let livestreamRoutingModule: LivestreamRoutingModule;

  beforeEach(() => {
    livestreamRoutingModule = new LivestreamRoutingModule();
  });

  it('should create an instance', () => {
    expect(livestreamRoutingModule).toBeTruthy();
  });
});
