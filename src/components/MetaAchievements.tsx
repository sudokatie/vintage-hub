'use client';

import { useState } from 'react';
import { 
  MetaAchievement, 
  PlayerStats,
  getUnlockedMetaAchievements,
  getLockedMetaAchievements,
  META_ACHIEVEMENTS 
} from '@/lib/meta-achievements';

interface MetaAchievementsProps {
  stats: PlayerStats;
}

function AchievementCard({ 
  achievement, 
  unlocked 
}: { 
  achievement: MetaAchievement; 
  unlocked: boolean;
}) {
  return (
    <div 
      className={`p-3 rounded-lg border ${
        unlocked 
          ? 'bg-gray-700 border-amber-500' 
          : 'bg-gray-800 border-gray-700 opacity-60'
      }`}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xl">{unlocked ? achievement.icon : '🔒'}</span>
        <span className={`font-semibold ${unlocked ? 'text-amber-400' : 'text-gray-400'}`}>
          {achievement.name}
        </span>
      </div>
      <p className="text-sm text-gray-400">{achievement.description}</p>
    </div>
  );
}

export function MetaAchievements({ stats }: MetaAchievementsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const unlocked = getUnlockedMetaAchievements(stats);
  const locked = getLockedMetaAchievements(stats);
  const total = META_ACHIEVEMENTS.length;
  const percent = Math.round((unlocked.length / total) * 100);

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-8">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">🏅</span>
          <div>
            <h3 className="text-lg font-bold">Cross-Game Achievements</h3>
            <p className="text-sm text-gray-400">
              {unlocked.length}/{total} unlocked ({percent}%)
            </p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-white">
          {isExpanded ? '▲' : '▼'}
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-gray-700 rounded overflow-hidden mt-4">
        <div 
          className="h-full bg-amber-500 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      {isExpanded && (
        <div className="mt-6 space-y-4">
          {/* Unlocked section */}
          {unlocked.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-green-400 mb-2 flex items-center gap-2">
                <span>✓</span> Unlocked ({unlocked.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {unlocked.map(a => (
                  <AchievementCard key={a.id} achievement={a} unlocked={true} />
                ))}
              </div>
            </div>
          )}

          {/* Locked section */}
          {locked.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-500 mb-2 flex items-center gap-2">
                <span>🔒</span> Locked ({locked.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {locked.map(a => (
                  <AchievementCard key={a.id} achievement={a} unlocked={false} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
