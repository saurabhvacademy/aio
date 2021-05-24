import { LoginheaderModule } from './loginheader.module';

describe('LoginheaderModule', () => {
  let loginheaderModule: LoginheaderModule;

  beforeEach(() => {
    loginheaderModule = new LoginheaderModule();
  });

  it('should create an instance', () => {
    expect(loginheaderModule).toBeTruthy();
  });
});
