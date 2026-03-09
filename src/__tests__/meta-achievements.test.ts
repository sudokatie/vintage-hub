import {
  META_ACHIEVEMENTS,
  PlayerStats,
  getUnlockedMetaAchievements,
  getLockedMetaAchievements,
} from '../lib/meta-achievements';

describe('meta-achievements', () => {
  const emptyStats: PlayerStats = {
    gamesPlayed: 0,
    gamesWithHighScore: 0,
    totalAchievements: 189, // 9 games * 21
    unlockedAchievements: 0,
    perfectGames: 0,
    arcadeGamesPlayed: 0,
    puzzleGamesPlayed: 0,
    highScores: {},
  };

  it('should have 12 meta achievements', () => {
    expect(META_ACHIEVEMENTS.length).toBe(12);
  });

  it('should have unique IDs', () => {
    const ids = META_ACHIEVEMENTS.map(a => a.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('should unlock First Steps when 1 game is played', () => {
    const stats: PlayerStats = { ...emptyStats, gamesPlayed: 1 };
    const unlocked = getUnlockedMetaAchievements(stats);
    expect(unlocked.some(a => a.id === 'first-steps')).toBe(true);
  });

  it('should not unlock anything with no activity', () => {
    const unlocked = getUnlockedMetaAchievements(emptyStats);
    expect(unlocked.length).toBe(0);
  });

  it('should unlock Achievement Hunter at 25 achievements', () => {
    const stats: PlayerStats = { ...emptyStats, unlockedAchievements: 25 };
    const unlocked = getUnlockedMetaAchievements(stats);
    expect(unlocked.some(a => a.id === 'achievement-hunter')).toBe(true);
  });

  it('should unlock Perfectionist with 1 perfect game', () => {
    const stats: PlayerStats = { ...emptyStats, perfectGames: 1 };
    const unlocked = getUnlockedMetaAchievements(stats);
    expect(unlocked.some(a => a.id === 'perfectionist')).toBe(true);
  });

  it('should unlock Arcade Fan with 5 arcade games played', () => {
    const stats: PlayerStats = { 
      ...emptyStats, 
      arcadeGamesPlayed: 5,
      gamesPlayed: 5,
    };
    const unlocked = getUnlockedMetaAchievements(stats);
    expect(unlocked.some(a => a.id === 'arcade-fan')).toBe(true);
  });

  it('should return locked achievements correctly', () => {
    const stats: PlayerStats = { ...emptyStats, gamesPlayed: 1 };
    const unlocked = getUnlockedMetaAchievements(stats);
    const locked = getLockedMetaAchievements(stats);
    expect(unlocked.length + locked.length).toBe(META_ACHIEVEMENTS.length);
  });

  it('should have all three categories represented', () => {
    const categories = new Set(META_ACHIEVEMENTS.map(a => a.category));
    expect(categories.has('milestone')).toBe(true);
    expect(categories.has('mastery')).toBe(true);
    expect(categories.has('variety')).toBe(true);
  });
});
