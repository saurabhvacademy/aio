import { KeyboardModule } from './keyboard.module';

describe('KeyboardModule', () => {
  let keyboardModule: KeyboardModule;

  beforeEach(() => {
    keyboardModule = new KeyboardModule();
  });

  it('should create an instance', () => {
    expect(keyboardModule).toBeTruthy();
  });
});
