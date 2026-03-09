'use client';

interface StatsBarProps {
  current: number;
  total: number;
  label: string;
  color?: string;
}

export function StatsBar({ current, total, label, color = 'bg-white/80' }: StatsBarProps) {
  const percent = total > 0 ? Math.round((current / total) * 100) : 0;
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-white/70">{label}</span>
        <span className="text-white">{current}/{total}</span>
      </div>
      <div className="h-1.5 bg-black/30 rounded overflow-hidden">
        <div 
          className={`h-full ${color} transition-all duration-300`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
