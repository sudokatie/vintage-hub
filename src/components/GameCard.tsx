'use client';

import { useEffect, useState } from 'react';
import type { GameInfo } from '@/lib/games';

interface GameCardProps {
  game: GameInfo;
}

interface GameProgress {
  highScore?: number;
  achievementsUnlocked?: number;
  totalAchievements?: number;
  lastPlayed?: string;
}

export function GameCard({ game }: GameCardProps) {
  const [progress, setProgress] = useState<GameProgress>({});

  useEffect(() => {
    // Read from localStorage
    try {
      // Try to get high score
      const scoreData = localStorage.getItem(game.storageKey);
      let highScore: number | undefined;
      if (scoreData) {
        const parsed = JSON.parse(scoreData);
        highScore = typeof parsed === 'number' ? parsed : parsed.highScore;
      }

      // Try to get achievements
      const achieveData = localStorage.getItem(game.achievementKey);
      let achievementsUnlocked = 0;
      let totalAchievements = 21; // Default
      if (achieveData) {
        const parsed = JSON.parse(achieveData);
        if (Array.isArray(parsed)) {
          achievementsUnlocked = parsed.filter(a => a.unlocked).length;
          totalAchievements = parsed.length;
        } else if (parsed.achievements) {
          achievementsUnlocked = parsed.achievements.filter((a: { unlocked: boolean }) => a.unlocked).length;
          totalAchievements = parsed.achievements.length;
        }
      }

      setProgress({
        highScore,
        achievementsUnlocked,
        totalAchievements,
      });
    } catch {
      // Ignore localStorage errors
    }
  }, [game]);

  const achievementPercent = progress.totalAchievements 
    ? Math.round((progress.achievementsUnlocked || 0) / progress.totalAchievements * 100)
    : 0;

  return (
    <a
      href={game.url}
      className={`block p-4 rounded-lg ${game.color} hover:opacity-90 transition-opacity`}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-xl font-bold text-white">{game.name}</h3>
        <span className="text-xs text-white/70 uppercase">{game.category}</span>
      </div>
      
      <p className="text-sm text-white/80 mb-4">{game.description}</p>
      
      <div className="space-y-2">
        {progress.highScore !== undefined && (
          <div className="flex justify-between text-sm">
            <span className="text-white/70">High Score</span>
            <span className="text-white font-mono">{progress.highScore.toLocaleString()}</span>
          </div>
        )}
        
        <div className="flex justify-between items-center text-sm">
          <span className="text-white/70">Achievements</span>
          <span className="text-white">
            {progress.achievementsUnlocked || 0}/{progress.totalAchievements || 21}
          </span>
        </div>
        
        {/* Achievement progress bar */}
        <div className="h-1 bg-black/30 rounded overflow-hidden">
          <div 
            className="h-full bg-white/80 transition-all duration-300"
            style={{ width: `${achievementPercent}%` }}
          />
        </div>
      </div>
    </a>
  );
}
