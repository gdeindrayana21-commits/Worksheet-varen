import React from 'react';
import { Volume2, Sparkles, Heart } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface KikoMascotProps {
  message: string;
  soundText?: string;
  compact?: boolean;
  mood?: 'happy' | 'cheering' | 'reading' | 'winner';
}

export const KikoMascot: React.FC<KikoMascotProps> = ({
  message,
  soundText,
  compact = false,
  mood = 'happy',
}) => {
  const handleSpeak = () => {
    soundFx.playPop();
    const textToSpeak = soundText || message;
    soundFx.speak(textToSpeak);
  };

  return (
    <div className={`flex items-start gap-3 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200/80 rounded-2xl p-3 sm:p-4 shadow-sm relative overflow-hidden ${compact ? 'py-2' : ''}`}>
      {/* Decorative subtle background elements */}
      <div className="absolute -top-4 -right-4 w-16 h-16 bg-amber-100/50 rounded-full blur-sm pointer-events-none" />
      <div className="absolute -bottom-3 right-10 text-amber-200/40 text-2xl select-none pointer-events-none">⭐</div>

      {/* Kiko Avatar Character SVG */}
      <div className="flex-shrink-0 flex flex-col items-center">
        <button
          onClick={handleSpeak}
          title="Klik Kiko untuk mendengarkan suaranya!"
          className="relative group transition-transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-full"
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-b from-sky-100 to-amber-100 border-2 border-amber-300 shadow-md flex items-center justify-center relative overflow-hidden group-hover:border-amber-400">
            {/* Adorable Bunny SVG with reading glasses / adventure bandana */}
            <svg
              viewBox="0 0 100 100"
              className="w-12 h-12 sm:w-14 sm:h-14 transition-transform group-hover:scale-105 duration-200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Ears */}
              <ellipse cx="38" cy="24" rx="9" ry="22" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="2.5" transform="rotate(-10 38 24)" />
              <ellipse cx="38" cy="24" rx="5" ry="14" fill="#FDE68A" transform="rotate(-10 38 24)" />
              
              <ellipse cx="62" cy="24" rx="9" ry="22" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="2.5" transform="rotate(10 62 24)" />
              <ellipse cx="62" cy="24" rx="5" ry="14" fill="#FDE68A" transform="rotate(10 62 24)" />

              {/* Head */}
              <ellipse cx="50" cy="58" rx="34" ry="30" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="2.5" />

              {/* Cheeks blush */}
              <ellipse cx="32" cy="65" rx="6" ry="4" fill="#FCA5A5" opacity="0.6" />
              <ellipse cx="68" cy="65" rx="6" ry="4" fill="#FCA5A5" opacity="0.6" />

              {/* Big friendly eyes */}
              <circle cx="39" cy="54" r="4.5" fill="#1E293B" />
              <circle cx="40.5" cy="52.5" r="1.5" fill="#FFFFFF" />
              <circle cx="61" cy="54" r="4.5" fill="#1E293B" />
              <circle cx="62.5" cy="52.5" r="1.5" fill="#FFFFFF" />

              {/* Cute nose & smile */}
              <polygon points="50,61 46,58 54,58" fill="#F43F5E" />
              <path d="M50 62 Q45 68 42 66" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
              <path d="M50 62 Q55 68 58 66" stroke="#475569" strokeWidth="2" strokeLinecap="round" />

              {/* Cute adventurer bandana / book collar */}
              <path d="M30 84 Q50 92 70 84 L64 96 Q50 98 36 96 Z" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1.5" />
              <circle cx="50" cy="87" r="3" fill="#FBBF24" />
            </svg>

            {/* Speaking audio wave indicator badge */}
            <div className="absolute -bottom-1 -right-1 bg-amber-500 text-white rounded-full p-1 shadow-sm">
              <Volume2 className="w-3 h-3 animate-pulse" />
            </div>
          </div>
        </button>
        <span className="text-[11px] font-bold text-amber-900 mt-1 flex items-center gap-0.5">
          Kiko 🐰
        </span>
      </div>

      {/* Speech Bubble */}
      <div className="flex-1">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Kata Kiko:
          </span>
          <button
            onClick={handleSpeak}
            className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-200/70 hover:bg-amber-300 text-amber-900 text-xs font-bold transition-colors cursor-pointer"
            title="Dengarkan Kiko berbicara"
          >
            <Volume2 className="w-3.5 h-3.5 text-amber-700" />
            <span>Dengarkan</span>
          </button>
        </div>
        <p className="text-sm sm:text-base font-semibold text-slate-800 leading-snug">
          {message}
        </p>
      </div>
    </div>
  );
};
