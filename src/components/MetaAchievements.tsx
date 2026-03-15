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
      className={`p-3 border ${
        unlocked 
          ? 'bg-mc-dark border-mc-red' 
          : 'bg-mc-panel border-mc-border opacity-50'
      }`}
    >
      <div className="flex items-center gap-2 mb-1">
        {unlocked ? (
          <div className="mc-dot" />
        ) : (
          <div className="w-1.5 h-1.5 bg-mc-gray-dim" />
        )}
        <span className={`text-xs font-medium tracking-wide uppercase ${
          unlocked ? 'text-mc-red' : 'text-mc-gray-dim'
        }`}>
          {achievement.name}
        </span>
      </div>
      <p className="text-[11px] text-mc-gray ml-4">{achievement.description}</p>
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
    <div className="mc-panel mc-panel-bottom p-5 mb-8">
      <button 
        className="w-full flex items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="mc-dot" />
          <div className="text-left">
            <h3 className="mc-header-primary text-sm">CROSS-GAME ACHIEVEMENTS</h3>
            <p className="mc-header text-[10px] mt-0.5">
              {unlocked.length}/{total} UNLOCKED ({percent}%)
            </p>
          </div>
        </div>
        <span className="mc-value text-mc-gray-dim text-sm">
          {isExpanded ? '[-]' : '[+]'}
        </span>
      </button>

      {/* Progress bar */}
      <div className="mc-progress mt-4">
        <div 
          className="mc-progress-fill"
          style={{ width: `${percent}%` }}
        />
      </div>

      {isExpanded && (
        <div className="mt-6 space-y-5">
          {/* Unlocked section */}
          {unlocked.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 bg-mc-red" />
                <h4 className="mc-header text-[10px]">UNLOCKED ({unlocked.length})</h4>
                <div className="flex-1 mc-divider" />
              </div>
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
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 bg-mc-gray-dim" />
                <h4 className="mc-header text-[10px] text-mc-gray-dim">LOCKED ({locked.length})</h4>
                <div className="flex-1 mc-divider" />
              </div>
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
