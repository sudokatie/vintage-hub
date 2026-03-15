'use client';

interface StatsBarProps {
  current: number;
  total: number;
  label: string;
}

export function StatsBar({ current, total, label }: StatsBarProps) {
  const percent = total > 0 ? Math.round((current / total) * 100) : 0;
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="mc-header text-[10px]">{label.toUpperCase()}</span>
        <div className="flex items-center gap-1">
          <span className="mc-value-red text-sm">{current}</span>
          <span className="text-mc-gray-dim text-xs">/</span>
          <span className="mc-value text-sm">{total}</span>
        </div>
      </div>
      <div className="mc-progress">
        <div 
          className="mc-progress-fill"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
