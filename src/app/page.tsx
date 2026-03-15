'use client';

import { useEffect, useState } from 'react';
import { GameCard } from '@/components/GameCard';
import { MetaAchievements } from '@/components/MetaAchievements';
import { getArcadeGames, getPuzzleGames } from '@/lib/games';
import { PlayerStats, calculatePlayerStats } from '@/lib/meta-achievements';

interface OverallStats {
  totalAchievements: number;
  unlockedAchievements: number;
  gamesPlayed: number;
}

export default function Home() {
  const [stats, setStats] = useState<OverallStats>({
    totalAchievements: 0,
    unlockedAchievements: 0,
    gamesPlayed: 0,
  });
  const [playerStats, setPlayerStats] = useState<PlayerStats | null>(null);

  useEffect(() => {
    const ps = calculatePlayerStats();
    setPlayerStats(ps);
    setStats({
      totalAchievements: ps.totalAchievements,
      unlockedAchievements: ps.unlockedAchievements,
      gamesPlayed: ps.gamesPlayed,
    });
  }, []);

  const arcadeGames = getArcadeGames();
  const puzzleGames = getPuzzleGames();
  const completionPercent = stats.totalAchievements 
    ? Math.round(stats.unlockedAchievements / stats.totalAchievements * 100)
    : 0;

  return (
    <main className="min-h-screen bg-mc-black text-white p-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <header className="mb-8">
          <div className="mc-panel mc-panel-bottom p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="mc-dot" />
                <h1 className="mc-header-primary text-lg">VINTAGE-HUB</h1>
              </div>
              <span className="mc-header">MISSION CONTROL</span>
            </div>
          </div>
        </header>

        {/* Stats Panel */}
        <section className="mb-8">
          <div className="mc-panel mc-panel-bottom p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="mc-header">PLAYER STATISTICS</span>
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              {/* Games Played */}
              <div className="border-r border-mc-border pr-6">
                <p className="mc-header mb-1">GAMES PLAYED</p>
                <p className="mc-value text-3xl">{stats.gamesPlayed}</p>
              </div>
              
              {/* Achievements */}
              <div className="border-r border-mc-border pr-6">
                <p className="mc-header mb-1">ACHIEVEMENTS</p>
                <div className="flex items-baseline gap-1">
                  <span className="mc-value-red text-3xl">{stats.unlockedAchievements}</span>
                  <span className="text-mc-gray-dim text-lg">/</span>
                  <span className="mc-value text-xl">{stats.totalAchievements}</span>
                </div>
              </div>
              
              {/* Completion */}
              <div>
                <p className="mc-header mb-1">COMPLETION</p>
                <p className="mc-value-red text-3xl">{completionPercent}%</p>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-5">
              <div className="mc-progress">
                <div 
                  className="mc-progress-fill"
                  style={{ width: `${completionPercent}%` }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Cross-Game Achievements */}
        {playerStats && <MetaAchievements stats={playerStats} />}

        {/* Arcade Games */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-mc-red" />
            <h2 className="mc-header-primary">ARCADE</h2>
            <div className="flex-1 mc-divider" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {arcadeGames.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>

        {/* Puzzle Games */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-mc-red" />
            <h2 className="mc-header-primary">PUZZLE</h2>
            <div className="flex-1 mc-divider" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {puzzleGames.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 border-t border-mc-border pt-4">
          <div className="flex items-center justify-between">
            <span className="mc-header">SYSTEM STATUS: ONLINE</span>
            <span className="text-mc-gray-dim text-xs font-mono">v1.0.0</span>
          </div>
        </footer>
      </div>
    </main>
  );
}
