import { QuestionforyouModule } from './questionforyou.module';

describe('QuestionforyouModule', () => {
  let questionforyouModule: QuestionforyouModule;

  beforeEach(() => {
    questionforyouModule = new QuestionforyouModule();
  });

  it('should create an instance', () => {
    expect(questionforyouModule).toBeTruthy();
  });
});
