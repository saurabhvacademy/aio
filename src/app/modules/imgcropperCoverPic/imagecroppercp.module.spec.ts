import { ImagecroppercpModule } from './imagecroppercp.module';

describe('ImagecropperModule', () => {
  let imagecropperModule: ImagecroppercpModule;

  beforeEach(() => {
    imagecropperModule = new ImagecroppercpModule();
  });

  it('should create an instance', () => {
    expect(imagecropperModule).toBeTruthy();
  });
});
