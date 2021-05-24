import { LiveclassinviteModule } from './liveclassinvite.module';

describe('LiveclassinviteModule', () => {
  let liveclassinviteModule: LiveclassinviteModule;

  beforeEach(() => {
    liveclassinviteModule = new LiveclassinviteModule();
  });

  it('should create an instance', () => {
    expect(liveclassinviteModule).toBeTruthy();
  });
});
