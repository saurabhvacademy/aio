import { PostotherviewModule } from './postotherview.module';

describe('PostotherviewModule', () => {
  let postotherviewModule: PostotherviewModule;

  beforeEach(() => {
    postotherviewModule = new PostotherviewModule();
  });

  it('should create an instance', () => {
    expect(postotherviewModule).toBeTruthy();
  });
});
