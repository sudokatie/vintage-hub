'use client';

import { useEffect, useState } from 'react';
import { GameCard } from '@/components/GameCard';
import { MetaAchievements } from '@/components/MetaAchievements';
import { GAMES, getArcadeGames, getPuzzleGames } from '@/lib/games';
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
    // Calculate overall stats from localStorage
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
    <main className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Vintage Games</h1>
          <p className="text-gray-400">Classic arcade and puzzle games</p>
        </div>

        {/* Overall Stats */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-3 gap-4 text-center mb-4">
            <div>
              <p className="text-3xl font-bold text-green-400">{stats.gamesPlayed}</p>
              <p className="text-sm text-gray-400">Games Played</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-amber-400">
                {stats.unlockedAchievements}/{stats.totalAchievements}
              </p>
              <p className="text-sm text-gray-400">Achievements</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-400">{completionPercent}%</p>
              <p className="text-sm text-gray-400">Completion</p>
            </div>
          </div>
          
          {/* Overall progress bar */}
          <div className="h-2 bg-gray-700 rounded overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 via-amber-500 to-blue-500 transition-all duration-500"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
        </div>

        {/* Cross-Game Achievements */}
        {playerStats && <MetaAchievements stats={playerStats} />}

        {/* Arcade Games */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-red-400">&#x1F3AE;</span> Arcade
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {arcadeGames.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>

        {/* Puzzle Games */}
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-purple-400">&#x1F9E9;</span> Puzzle
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {puzzleGames.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>Made with pixels and passion</p>
        </footer>
      </div>
    </main>
  );
}
