import { CourseleftmenuModule } from './courseleftmenu.module';

describe('CourseleftmenuModule', () => {
  let courseleftmenuModule: CourseleftmenuModule;

  beforeEach(() => {
    courseleftmenuModule = new CourseleftmenuModule();
  });

  it('should create an instance', () => {
    expect(courseleftmenuModule).toBeTruthy();
  });
});
