import { LeaderboardModule } from './leaderboard.module';

describe('LeaderboardModule', () => {
  let leaderboardModule: LeaderboardModule;

  beforeEach(() => {
    leaderboardModule = new LeaderboardModule();
  });

  it('should create an instance', () => {
    expect(leaderboardModule).toBeTruthy();
  });
});
