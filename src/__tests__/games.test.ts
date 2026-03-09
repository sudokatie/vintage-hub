import { GAMES, getArcadeGames, getPuzzleGames } from '../lib/games';

describe('games', () => {
  it('should have 9 games total', () => {
    expect(GAMES).toHaveLength(9);
  });

  it('should have 5 arcade games', () => {
    expect(getArcadeGames()).toHaveLength(5);
  });

  it('should have 4 puzzle games', () => {
    expect(getPuzzleGames()).toHaveLength(4);
  });

  it('should have unique IDs', () => {
    const ids = GAMES.map(g => g.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should have required fields for all games', () => {
    for (const game of GAMES) {
      expect(game.id).toBeTruthy();
      expect(game.name).toBeTruthy();
      expect(game.description).toBeTruthy();
      expect(game.category).toMatch(/^(arcade|puzzle)$/);
      expect(game.color).toBeTruthy();
      expect(game.storageKey).toBeTruthy();
      expect(game.achievementKey).toBeTruthy();
      expect(game.url).toBeTruthy();
    }
  });
});
