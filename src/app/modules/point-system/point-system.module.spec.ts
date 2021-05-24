import { PointSystemModule } from './point-system.module';

describe('PointSystemModule', () => {
  let pointSystemModule: PointSystemModule;

  beforeEach(() => {
    pointSystemModule = new PointSystemModule();
  });

  it('should create an instance', () => {
    expect(pointSystemModule).toBeTruthy();
  });
});
