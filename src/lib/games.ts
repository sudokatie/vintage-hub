export interface GameInfo {
  id: string;
  name: string;
  description: string;
  category: 'arcade' | 'puzzle';
  color: string;
  storageKey: string;
  achievementKey: string;
  url: string;
}

// Base URL for games - update when deploying
// Options: relative paths, subdomain, or full URLs
export const GAMES_BASE_URL = '/games';

export const GAMES: GameInfo[] = [
  // Arcade Games
  {
    id: 'hopper',
    name: 'Hopper',
    description: 'Cross the road without getting hit',
    category: 'arcade',
    color: 'bg-green-600',
    storageKey: 'hopper-highscore',
    achievementKey: 'hopper-achievements',
    url: '/games/hopper',
  },
  {
    id: 'intercept',
    name: 'Intercept',
    description: 'Defend cities from missile attacks',
    category: 'arcade',
    color: 'bg-red-600',
    storageKey: 'intercept-highscore',
    achievementKey: 'intercept-achievements',
    url: '/games/intercept',
  },
  {
    id: 'rescue',
    name: 'Rescue',
    description: 'Save survivors with your helicopter',
    category: 'arcade',
    color: 'bg-blue-600',
    storageKey: 'rescue-highscore',
    achievementKey: 'rescue-achievements',
    url: '/games/rescue',
  },
  {
    id: 'detonator',
    name: 'Detonator',
    description: 'Demolish buildings strategically',
    category: 'arcade',
    color: 'bg-orange-600',
    storageKey: 'detonator-highscore',
    achievementKey: 'detonator-achievements',
    url: '/games/detonator',
  },
  {
    id: 'digger',
    name: 'Digger',
    description: 'Dig tunnels and collect gems',
    category: 'arcade',
    color: 'bg-yellow-600',
    storageKey: 'digger-highscore',
    achievementKey: 'digger-achievements',
    url: '/games/digger',
  },
  // Puzzle Games
  {
    id: 'crates',
    name: 'Crates',
    description: 'Push crates onto targets',
    category: 'puzzle',
    color: 'bg-amber-700',
    storageKey: 'crates-progress',
    achievementKey: 'crates-achievements',
    url: '/games/crates',
  },
  {
    id: 'lemming',
    name: 'Lemming',
    description: 'Guide creatures to safety',
    category: 'puzzle',
    color: 'bg-emerald-600',
    storageKey: 'lemming-progress',
    achievementKey: 'lemming-achievements',
    url: '/games/lemming',
  },
  {
    id: 'conduit',
    name: 'Conduit',
    description: 'Connect pipes before time runs out',
    category: 'puzzle',
    color: 'bg-cyan-600',
    storageKey: 'conduit-progress',
    achievementKey: 'conduit-achievements',
    url: '/games/conduit',
  },
  {
    id: 'excavation',
    name: 'Excavation',
    description: 'Dig for gems, avoid boulders',
    category: 'puzzle',
    color: 'bg-purple-600',
    storageKey: 'excavation-progress',
    achievementKey: 'excavation-achievements',
    url: '/games/excavation',
  },
];

export function getArcadeGames(): GameInfo[] {
  return GAMES.filter(g => g.category === 'arcade');
}

export function getPuzzleGames(): GameInfo[] {
  return GAMES.filter(g => g.category === 'puzzle');
}
