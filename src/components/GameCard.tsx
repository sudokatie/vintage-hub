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
      let totalAchievements = 21;
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
      className="mc-panel mc-panel-bottom mc-interactive block p-4 group"
    >
      {/* Header row */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="mc-dot" />
          <h3 className="mc-header-primary text-sm">{game.name.toUpperCase()}</h3>
        </div>
        <span className="mc-header text-[10px]">{game.category.toUpperCase()}</span>
      </div>
      
      {/* Description */}
      <p className="text-mc-gray text-xs mb-4 leading-relaxed">
        {game.description}
      </p>
      
      {/* Stats grid */}
      <div className="space-y-2">
        {progress.highScore !== undefined && (
          <div className="flex justify-between items-center">
            <span className="mc-header text-[10px]">HIGH SCORE</span>
            <span className="mc-value text-sm">{progress.highScore.toLocaleString()}</span>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <span className="mc-header text-[10px]">ACHIEVEMENTS</span>
          <div className="flex items-center gap-1">
            <span className="mc-value-red text-sm">{progress.achievementsUnlocked || 0}</span>
            <span className="text-mc-gray-dim text-xs">/</span>
            <span className="mc-value text-sm">{progress.totalAchievements || 21}</span>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mc-progress mt-2">
          <div 
            className="mc-progress-fill"
            style={{ width: `${achievementPercent}%` }}
          />
        </div>
      </div>

      {/* Hover indicator */}
      <div className="mt-3 pt-2 border-t border-mc-border opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="mc-header text-[10px] text-mc-red">LAUNCH GAME</span>
      </div>
    </a>
  );
}
