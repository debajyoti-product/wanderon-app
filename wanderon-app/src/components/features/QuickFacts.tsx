import type { TripStats } from '../../data/types';

interface QuickFactsProps {
  duration: string;
  stats?: TripStats;
  ageLimit?: string;
  className?: string;
}

export default function QuickFacts({ duration, stats, ageLimit = '18 to 45 years', className = '' }: QuickFactsProps) {
  return (
    <div className={`${className}`}>
      <div className="grid grid-cols-2 gap-3 gap-y-4">
        {/* Duration */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
            <i className="fa-regular fa-clock text-orange-500 text-[13px]" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider leading-none mb-1">Duration</span>
            <span className="font-bold text-brand-dark text-xs leading-none">{duration}</span>
          </div>
        </div>

        {/* Age Limit */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
            <i className="fa-solid fa-id-card text-emerald-500 text-[13px]" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider leading-none mb-1">Age Limit</span>
            <span className="font-bold text-brand-dark text-xs leading-none">{ageLimit}</span>
          </div>
        </div>

        {/* Men:Women */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
            <i className="fa-solid fa-venus-mars text-violet-500 text-[13px]" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider leading-none mb-1">Men:Women(%)</span>
            <span className="font-bold text-brand-dark text-xs leading-none">{stats?.genderRatio ?? '50:50'}</span>
          </div>
        </div>

        {/* Solo Travelers */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
            <i className="fa-solid fa-user-ninja text-rose-500 text-[13px]" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider leading-none mb-1">Solo Travelers</span>
            <span className="font-bold text-brand-dark text-xs leading-none">{stats?.soloPercent ?? 40}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
