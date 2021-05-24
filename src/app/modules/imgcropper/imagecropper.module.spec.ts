import { ImagecropperModule } from './imagecropper.module';

describe('ImagecropperModule', () => {
  let imagecropperModule: ImagecropperModule;

  beforeEach(() => {
    imagecropperModule = new ImagecropperModule();
  });

  it('should create an instance', () => {
    expect(imagecropperModule).toBeTruthy();
  });
});
