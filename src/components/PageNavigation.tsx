import React from 'react';
import { ArrowLeft, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { worksheetPages } from '../data/worksheetData';
import { soundFx } from '../utils/audio';

interface PageNavigationProps {
  currentPageIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onSelectPage: (index: number) => void;
}

export const PageNavigation: React.FC<PageNavigationProps> = ({
  currentPageIndex,
  onPrev,
  onNext,
  onSelectPage,
}) => {
  const isFirst = currentPageIndex === 0;
  const isLast = currentPageIndex === worksheetPages.length - 1;
  const page = worksheetPages[currentPageIndex];

  const handlePrev = () => {
    if (!isFirst) {
      soundFx.playPop();
      onPrev();
    }
  };

  const handleNext = () => {
    if (!isLast) {
      soundFx.playPop();
      onNext();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 no-print">
      {/* Prev Button */}
      <button
        onClick={handlePrev}
        disabled={isFirst}
        className={`w-full sm:w-auto px-5 py-3 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer ${
          isFirst
            ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed opacity-60'
            : 'bg-white hover:bg-amber-50 text-amber-900 border-2 border-amber-300 active:scale-95'
        }`}
      >
        <ArrowLeft className="w-5 h-5 text-amber-600" />
        <span>Halaman Sebelumnya</span>
      </button>

      {/* Page Progress Info & Quick Jump Slider */}
      <div className="flex flex-col items-center gap-1.5 w-full sm:w-64">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs">
            {page.pageNumber}
          </span>
          <span>dari {worksheetPages.length} Halaman</span>
        </div>

        <input
          type="range"
          min={0}
          max={worksheetPages.length - 1}
          value={currentPageIndex}
          onChange={(e) => {
            const idx = parseInt(e.target.value, 10);
            onSelectPage(idx);
          }}
          className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
          title="Geser halaman"
        />
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={isLast}
        className={`w-full sm:w-auto px-6 py-3 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer ${
          isLast
            ? 'bg-emerald-600 text-white opacity-80 cursor-default'
            : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white active:scale-95 shadow-amber-500/20'
        }`}
      >
        <span>{isLast ? 'Selesai! 🏆' : 'Halaman Berikutnya'}</span>
        {!isLast ? (
          <ArrowRight className="w-5 h-5" />
        ) : (
          <CheckCircle2 className="w-5 h-5 text-emerald-200" />
        )}
      </button>
    </div>
  );
};
