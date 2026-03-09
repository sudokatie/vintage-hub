import { GAMES } from './games';

export interface MetaAchievement {
  id: string;
  name: string;
  description: string;
  category: 'milestone' | 'mastery' | 'variety';
  icon: string;
  check: (stats: PlayerStats) => boolean;
}

export interface PlayerStats {
  gamesPlayed: number;
  gamesWithHighScore: number;
  totalAchievements: number;
  unlockedAchievements: number;
  perfectGames: number; // games with all 21 achievements
  arcadeGamesPlayed: number;
  puzzleGamesPlayed: number;
  highScores: Record<string, number>;
}

export const META_ACHIEVEMENTS: MetaAchievement[] = [
  // Milestone achievements
  {
    id: 'first-steps',
    name: 'First Steps',
    description: 'Play your first game',
    category: 'milestone',
    icon: '👣',
    check: (stats) => stats.gamesPlayed >= 1,
  },
  {
    id: 'getting-started',
    name: 'Getting Started',
    description: 'Play 3 different games',
    category: 'milestone',
    icon: '🎮',
    check: (stats) => stats.gamesPlayed >= 3,
  },
  {
    id: 'variety-pack',
    name: 'Variety Pack',
    description: 'Play all 9 games',
    category: 'milestone',
    icon: '🎪',
    check: (stats) => stats.gamesPlayed >= 9,
  },
  {
    id: 'achievement-hunter',
    name: 'Achievement Hunter',
    description: 'Unlock 25 achievements total',
    category: 'milestone',
    icon: '🏆',
    check: (stats) => stats.unlockedAchievements >= 25,
  },
  {
    id: 'trophy-collector',
    name: 'Trophy Collector',
    description: 'Unlock 50 achievements total',
    category: 'milestone',
    icon: '🥇',
    check: (stats) => stats.unlockedAchievements >= 50,
  },
  {
    id: 'achievement-master',
    name: 'Achievement Master',
    description: 'Unlock 100 achievements total',
    category: 'milestone',
    icon: '👑',
    check: (stats) => stats.unlockedAchievements >= 100,
  },

  // Mastery achievements
  {
    id: 'perfectionist',
    name: 'Perfectionist',
    description: 'Get all achievements in one game',
    category: 'mastery',
    icon: '💯',
    check: (stats) => stats.perfectGames >= 1,
  },
  {
    id: 'completionist',
    name: 'Completionist',
    description: 'Get all achievements in 3 games',
    category: 'mastery',
    icon: '✨',
    check: (stats) => stats.perfectGames >= 3,
  },
  {
    id: 'true-master',
    name: 'True Master',
    description: 'Get all achievements in all 9 games',
    category: 'mastery',
    icon: '🌟',
    check: (stats) => stats.perfectGames >= 9,
  },

  // Variety achievements
  {
    id: 'arcade-fan',
    name: 'Arcade Fan',
    description: 'Play all 5 arcade games',
    category: 'variety',
    icon: '🕹️',
    check: (stats) => stats.arcadeGamesPlayed >= 5,
  },
  {
    id: 'puzzle-solver',
    name: 'Puzzle Solver',
    description: 'Play all 4 puzzle games',
    category: 'variety',
    icon: '🧩',
    check: (stats) => stats.puzzleGamesPlayed >= 4,
  },
  {
    id: 'score-chaser',
    name: 'Score Chaser',
    description: 'Set a high score in 5 games',
    category: 'variety',
    icon: '📊',
    check: (stats) => stats.gamesWithHighScore >= 5,
  },
];

export function calculatePlayerStats(): PlayerStats {
  const stats: PlayerStats = {
    gamesPlayed: 0,
    gamesWithHighScore: 0,
    totalAchievements: 0,
    unlockedAchievements: 0,
    perfectGames: 0,
    arcadeGamesPlayed: 0,
    puzzleGamesPlayed: 0,
    highScores: {},
  };

  if (typeof window === 'undefined') return stats;

  for (const game of GAMES) {
    let gameHasActivity = false;
    let gameAchievements = 0;
    let gameUnlocked = 0;

    // Check achievements
    try {
      const achieveData = localStorage.getItem(game.achievementKey);
      if (achieveData) {
        const parsed = JSON.parse(achieveData);
        if (Array.isArray(parsed)) {
          gameAchievements = parsed.length;
          gameUnlocked = parsed.filter(a => a.unlocked).length;
          if (gameUnlocked > 0) gameHasActivity = true;
        } else if (parsed.achievements) {
          gameAchievements = parsed.achievements.length;
          gameUnlocked = parsed.achievements.filter((a: { unlocked: boolean }) => a.unlocked).length;
          if (gameUnlocked > 0) gameHasActivity = true;
        }
      } else {
        gameAchievements = 21; // Default
      }
    } catch {
      gameAchievements = 21;
    }

    stats.totalAchievements += gameAchievements;
    stats.unlockedAchievements += gameUnlocked;
    if (gameUnlocked === gameAchievements && gameAchievements > 0) {
      stats.perfectGames++;
    }

    // Check high scores
    try {
      const scoreData = localStorage.getItem(game.storageKey);
      if (scoreData) {
        const score = parseInt(scoreData, 10);
        if (!isNaN(score) && score > 0) {
          stats.highScores[game.id] = score;
          stats.gamesWithHighScore++;
          gameHasActivity = true;
        }
      }
    } catch {
      // Ignore
    }

    if (gameHasActivity) {
      stats.gamesPlayed++;
      if (game.category === 'arcade') {
        stats.arcadeGamesPlayed++;
      } else {
        stats.puzzleGamesPlayed++;
      }
    }
  }

  return stats;
}

export function getUnlockedMetaAchievements(stats: PlayerStats): MetaAchievement[] {
  return META_ACHIEVEMENTS.filter(a => a.check(stats));
}

export function getLockedMetaAchievements(stats: PlayerStats): MetaAchievement[] {
  return META_ACHIEVEMENTS.filter(a => !a.check(stats));
}
