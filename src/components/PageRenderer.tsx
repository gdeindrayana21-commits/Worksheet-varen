import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Volume2, Sparkles, Star, CheckCircle, Trophy, Award, 
  HelpCircle, Check, ArrowRight, Heart, BookOpen, Compass
} from 'lucide-react';
import { WorksheetPage, StudentProfile } from '../types';
import { KikoMascot } from './KikoMascot';
import { DrawingCanvas } from './DrawingCanvas';
import { CertificateView } from './CertificateView';
import { soundFx } from '../utils/audio';

interface PageRendererProps {
  page: WorksheetPage;
  profile: StudentProfile;
  onUpdateProfile: (profile: StudentProfile) => void;
  onSelectPageByNumber: (pageNumber: number) => void;
  onNextPage: () => void;
  onPrintCertificate: () => void;
}

export const PageRenderer: React.FC<PageRendererProps> = ({
  page,
  profile,
  onUpdateProfile,
  onSelectPageByNumber,
  onNextPage,
  onPrintCertificate,
}) => {
  // State for interactive activities
  const [selectedLetters, setSelectedLetters] = useState<Record<string, boolean>>({});
  const [connectedPairs, setConnectedPairs] = useState<Record<string, string>>({});
  const [activeLeft, setActiveLeft] = useState<string | null>(null);
  const [chosenOptions, setChosenOptions] = useState<Record<string, string>>({});
  const [filledBlanks, setFilledBlanks] = useState<Record<string, string>>({});
  const [completedMissions, setCompletedMissions] = useState<Record<string, boolean>>({});
  const [rewardStars, setRewardStars] = useState<number[]>([]);
  const [sentenceCards, setSentenceCards] = useState<string[]>([]);

  // Trigger celebration confetti
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#ec4899', '#3b82f6', '#10b981', '#8b5cf6'],
      });
    } catch {}
  };

  // -------------------------------------------------------------------------
  // 1. COVER (HALAMAN 1)
  // -------------------------------------------------------------------------
  if (page.activityType === 'cover') {
    return (
      <div className="w-full flex flex-col items-center text-center py-4 sm:py-8 space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs sm:text-sm font-bold shadow-xs">
          <span>🌈</span>
          <span>{page.data.badge}</span>
        </div>

        {/* Big Colorful Title */}
        <div className="space-y-2 max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-amber-900 tracking-tight leading-tight">
            “PETUALANGAN JADI PEMBACA HEBAT” 📚✨
          </h1>
          <p className="text-base sm:text-xl font-bold text-amber-700 max-w-xl mx-auto">
            {page.data.subtitle}
          </p>
        </div>

        {/* Grand 3D Cartoon Style Visual of Kiko & Alphabet World */}
        <div className="w-full max-w-md bg-gradient-to-b from-sky-100 via-amber-50 to-emerald-100 rounded-3xl p-6 sm:p-8 border-4 border-amber-300 shadow-xl relative overflow-hidden flex flex-col items-center">
          {/* Floating Letters & Elements */}
          <span className="absolute top-4 left-6 text-3xl font-black text-rose-500/70 animate-bounce">A</span>
          <span className="absolute top-8 right-8 text-3xl font-black text-blue-500/70 animate-pulse">B</span>
          <span className="absolute bottom-12 left-8 text-3xl font-black text-emerald-500/70">C</span>
          <span className="absolute bottom-10 right-10 text-3xl font-black text-purple-500/70">D</span>
          
          {/* Mascot Center Illustration */}
          <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-white/90 border-4 border-amber-400 flex items-center justify-center shadow-lg relative my-2">
            <span className="text-7xl sm:text-8xl select-none">🐰</span>
            <div className="absolute -bottom-2 px-3 py-1 bg-amber-500 text-white font-extrabold text-xs sm:text-sm rounded-full shadow-sm">
              Kiko si Kelinci
            </div>
          </div>

          <div className="mt-4 text-center">
            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-500">
              Teman Belajar Membaca Terbaikmu!
            </span>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={() => {
            soundFx.playCorrect();
            triggerConfetti();
            onNextPage();
          }}
          className="px-8 py-4 rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-lg sm:text-xl shadow-lg shadow-amber-500/30 flex items-center gap-3 transition-transform active:scale-95 cursor-pointer"
        >
          <span>🚀 Buka Buku & Mulai Petualangan!</span>
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // 2. PROFILE: INI BUKUKU (HALAMAN 2)
  // -------------------------------------------------------------------------
  if (page.activityType === 'profile') {
    const avatars = ['🐰', '🐼', '🐻', '🐱', '🦊', '🦁', '🌟'];

    return (
      <div className="w-full max-w-xl mx-auto space-y-6">
        <KikoMascot message={page.kikoMessage} />

        <div className="bg-white rounded-3xl border-4 border-amber-300 p-6 sm:p-8 shadow-md space-y-6">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-amber-900">
              📖 INI BUKUKU 📖
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">
              Worksheet ini milik calon Pembaca Hebat!
            </p>
          </div>

          {/* Avatar Selector */}
          <div className="text-center">
            <label className="block text-xs font-bold text-slate-600 uppercase mb-2">
              Pilih Karakter Favoritmu:
            </label>
            <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
              {avatars.map((av) => (
                <button
                  key={av}
                  onClick={() => {
                    soundFx.playPop();
                    onUpdateProfile({ ...profile, avatar: av });
                  }}
                  className={`w-12 h-12 rounded-2xl text-2xl flex items-center justify-center border-2 transition-transform cursor-pointer ${
                    profile.avatar === av
                      ? 'bg-amber-100 border-amber-500 scale-110 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">
                Nama Lengkap:
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => onUpdateProfile({ ...profile, name: e.target.value })}
                placeholder="Tulis nama panggilan atau nama lengkap..."
                className="w-full border-2 border-amber-300 rounded-2xl px-4 py-3 text-base sm:text-lg font-bold text-slate-800 focus:outline-none focus:border-amber-500 bg-amber-50/20"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">
                  Usia:
                </label>
                <input
                  type="text"
                  value={profile.age}
                  onChange={(e) => onUpdateProfile({ ...profile, age: e.target.value })}
                  placeholder="Contoh: 5 Tahun"
                  className="w-full border-2 border-amber-300 rounded-2xl px-4 py-3 text-base font-bold text-slate-800 focus:outline-none focus:border-amber-500 bg-amber-50/20"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">
                  Tanggal Mulai:
                </label>
                <input
                  type="text"
                  value={profile.date}
                  onChange={(e) => onUpdateProfile({ ...profile, date: e.target.value })}
                  placeholder="Contoh: Hari ini"
                  className="w-full border-2 border-amber-300 rounded-2xl px-4 py-3 text-base font-bold text-slate-800 focus:outline-none focus:border-amber-500 bg-amber-50/20"
                />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-100 to-orange-100 text-center border border-amber-200">
            <span className="text-base font-extrabold text-amber-900">
              {page.data.praise}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // 3. MAP: PETA PETUALANGAN (HALAMAN 3)
  // -------------------------------------------------------------------------
  if (page.activityType === 'map') {
    return (
      <div className="w-full max-w-2xl mx-auto space-y-6">
        <KikoMascot message={page.kikoMessage} />

        <div className="bg-white rounded-3xl border-4 border-amber-300 p-6 sm:p-8 shadow-md">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-amber-900">
              🗺️ PETA PETUALANGAN MEMBACA 🗺️
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">
              Klik pos manapun untuk melihat misi di dalamnya!
            </p>
          </div>

          {/* Stepping Stones Adventure Route */}
          <div className="space-y-3">
            {page.data.checkpoints.map((cp: any, idx: number) => (
              <div
                key={cp.id}
                onClick={() => {
                  soundFx.playPop();
                  // Jump to starting page of that level
                  const pageStarts = [4, 15, 22, 33, 44, 53, 57, 59, 60];
                  if (pageStarts[idx]) {
                    onSelectPageByNumber(pageStarts[idx]);
                  }
                }}
                className="flex items-center justify-between p-3 sm:p-4 rounded-2xl border-2 border-amber-200 hover:border-amber-400 bg-gradient-to-r from-amber-50/60 to-white hover:from-amber-100/70 transition-all cursor-pointer shadow-xs active:scale-98"
              >
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-amber-500 text-white font-bold text-sm flex items-center justify-center shadow-xs">
                    {idx + 1}
                  </span>
                  <span className="text-2xl">{cp.icon}</span>
                  <div>
                    <span className="font-extrabold text-slate-800 text-sm sm:text-base block">
                      {cp.name}
                    </span>
                    <span className="text-xs text-amber-700 font-bold">{cp.range}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-amber-600">
                  <span>Mulai Pos</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // 4. LETTER TRACE (HALAMAN 4, 8)
  // -------------------------------------------------------------------------
  if (page.activityType === 'letter-trace') {
    return (
      <div className="w-full max-w-2xl mx-auto space-y-5">
        <KikoMascot
          message={page.kikoMessage}
          soundText={page.data.soundText || page.instruction}
        />

        <div className="bg-white rounded-3xl border-4 border-amber-300 p-6 sm:p-8 shadow-md space-y-6">
          {/* Big Visual Header */}
          <div className="flex items-center justify-around bg-gradient-to-r from-amber-50 via-sky-50 to-amber-50 p-4 sm:p-6 rounded-2xl border-2 border-amber-200">
            <div className="text-center">
              <span className="text-5xl sm:text-7xl font-extrabold font-sans text-amber-900 tracking-wider">
                {page.data.capital} {page.data.small}
              </span>
              <div className="text-xs font-bold text-slate-500 mt-1">Huruf Besar & Kecil</div>
            </div>

            <div className="text-center border-l-2 border-amber-200 pl-6">
              <span className="text-5xl sm:text-6xl block select-none">
                {page.data.emoji || '🍎'}
              </span>
              <span className="text-lg sm:text-xl font-extrabold text-amber-900 font-heading block mt-1">
                {page.data.word || (page.data.words && page.data.words.join(' • '))}
              </span>
            </div>
          </div>

          {/* Sound Listen Button */}
          <div className="text-center">
            <button
              onClick={() => {
                soundFx.playPop();
                soundFx.speak(page.data.soundText || `${page.data.capital} untuk ${page.data.word}`);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-extrabold text-sm sm:text-base border border-amber-300 shadow-xs transition-transform active:scale-95 cursor-pointer"
            >
              <Volume2 className="w-5 h-5 text-amber-700" />
              <span>🔊 Dengarkan Bunyi Huruf Ini</span>
            </button>
          </div>

          {/* Drawing & Tracing Canvas */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-700 px-1">
              <span>✍️ Ruang Menulis & Menebalkan Huruf:</span>
              <span className="text-amber-700">Gunakan kuas di bawah ini!</span>
            </div>
            <DrawingCanvas
              height={180}
              watermarkText={page.data.traceTarget || `${page.data.capital} ${page.data.small}`}
              onDrawEnd={() => {
                soundFx.playPop();
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // 5. LETTER CIRCLE (HALAMAN 5, 9)
  // -------------------------------------------------------------------------
  if (page.activityType === 'letter-circle') {
    const handleToggleCircle = (id: string, isCorrect: boolean) => {
      setSelectedLetters((prev) => {
        const next = { ...prev, [id]: !prev[id] };
        if (!prev[id] && isCorrect) {
          soundFx.playCorrect();
        } else {
          soundFx.playPop();
        }
        return next;
      });
    };

    return (
      <div className="w-full max-w-2xl mx-auto space-y-5">
        <KikoMascot message={page.kikoMessage} soundText={page.instruction} />

        <div className="bg-white rounded-3xl border-4 border-amber-300 p-6 sm:p-8 shadow-md space-y-6">
          {/* Exemplar Card */}
          {page.data.capital && (
            <div className="flex items-center justify-center gap-6 p-4 rounded-2xl bg-amber-50 border border-amber-200">
              <span className="text-5xl font-extrabold font-sans text-amber-900">
                {page.data.capital} {page.data.small}
              </span>
              <span className="text-4xl">{page.data.emoji}</span>
              <span className="text-xl font-extrabold text-amber-800">{page.data.word}</span>
            </div>
          )}

          <div className="text-center">
            <h3 className="text-base sm:text-lg font-bold text-slate-800">
              {page.data.targetPrompt || 'Lingkari semua huruf target di bawah ini! (Klik untuk melingkari)'}
            </h3>
          </div>

          {/* Letter Balloons Grid */}
          <div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-md mx-auto">
            {page.data.grid.map((item: any) => {
              const isSelected = !!selectedLetters[item.id];
              return (
                <button
                  key={item.id}
                  onClick={() => handleToggleCircle(item.id, item.isCorrect)}
                  className={`h-16 sm:h-20 rounded-2xl sm:rounded-3xl flex items-center justify-center text-2xl sm:text-3xl font-extrabold font-sans transition-all cursor-pointer relative ${
                    isSelected
                      ? item.isCorrect
                        ? 'bg-emerald-100 text-emerald-800 border-4 border-emerald-500 scale-105 shadow-md'
                        : 'bg-amber-100 text-amber-800 border-4 border-amber-400'
                      : 'bg-slate-50 hover:bg-amber-50 text-slate-800 border-2 border-dashed border-slate-300'
                  }`}
                >
                  <span>{item.char}</span>
                  {isSelected && (
                    <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs">
                      ✓
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Optional Tracing Space */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-bold text-slate-600 block">
              ✍️ Coba tulis juga di kotak latihan:
            </span>
            <DrawingCanvas height={130} watermarkText={page.data.capital || 'I i'} />
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // 6. MATCH PAIRS (HALAMAN 6, 10, 13)
  // -------------------------------------------------------------------------
  if (page.activityType === 'match-pairs') {
    const handleLeftClick = (id: string) => {
      soundFx.playPop();
      setActiveLeft(id);
    };

    const handleRightClick = (id: string) => {
      if (activeLeft) {
        if (activeLeft === id) {
          soundFx.playCorrect();
          setConnectedPairs((prev) => ({ ...prev, [id]: id }));
        } else {
          soundFx.playPop();
        }
        setActiveLeft(null);
      }
    };

    return (
      <div className="w-full max-w-2xl mx-auto space-y-5">
        <KikoMascot message={page.kikoMessage} soundText={page.instruction} />

        <div className="bg-white rounded-3xl border-4 border-amber-300 p-6 sm:p-8 shadow-md space-y-6">
          <div className="text-center">
            <h3 className="text-base sm:text-lg font-bold text-slate-800">
              Klik huruf di kiri, lalu klik pasangannya di kanan!
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {/* Left Column */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block text-center">
                Huruf
              </span>
              {page.data.pairs.map((pair: any) => {
                const isMatched = !!connectedPairs[pair.id];
                const isActive = activeLeft === pair.id;

                return (
                  <button
                    key={pair.id}
                    onClick={() => handleLeftClick(pair.id)}
                    className={`w-full p-4 rounded-2xl text-center text-xl sm:text-2xl font-extrabold font-sans border-2 transition-all cursor-pointer ${
                      isMatched
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                        : isActive
                        ? 'bg-amber-200 border-amber-500 text-amber-950 scale-105 shadow-sm'
                        : 'bg-slate-50 hover:bg-amber-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    {pair.left}
                  </button>
                );
              })}
            </div>

            {/* Right Column */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block text-center">
                Pasangan
              </span>
              {page.data.pairs.map((pair: any) => {
                const isMatched = !!connectedPairs[pair.id];

                return (
                  <button
                    key={pair.id}
                    onClick={() => handleRightClick(pair.id)}
                    className={`w-full p-4 rounded-2xl flex items-center justify-center gap-2 text-base sm:text-xl font-extrabold border-2 transition-all cursor-pointer ${
                      isMatched
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                        : 'bg-slate-50 hover:bg-amber-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <span className="text-2xl">{pair.emoji}</span>
                    <span>{pair.right}</span>
                    {isMatched && <Check className="w-5 h-5 text-emerald-600 ml-auto" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tracing / line space */}
          <div className="pt-2">
            <span className="text-xs font-bold text-slate-500 block mb-1">
              ✏️ Kamu juga bisa menarik garis langsung di bawah:
            </span>
            <DrawingCanvas height={110} />
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // 7. FIND LETTERS (HALAMAN 7, 12)
  // -------------------------------------------------------------------------
  if (page.activityType === 'find-letters') {
    const handleToggleLetter = (id: string, target: string) => {
      setSelectedLetters((prev) => {
        const next = { ...prev, [id]: !prev[id] };
        if (!prev[id] && target !== 'none') {
          soundFx.playCorrect();
        } else {
          soundFx.playPop();
        }
        return next;
      });
    };

    return (
      <div className="w-full max-w-2xl mx-auto space-y-5">
        <KikoMascot message={page.kikoMessage} soundText={page.instruction} />

        <div className="bg-white rounded-3xl border-4 border-amber-300 p-6 sm:p-8 shadow-md space-y-6">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Huruf yang Dicari:
            </span>
            <div className="flex items-center justify-center gap-3 mt-1">
              {page.data.targetLetters.map((l: string) => (
                <span
                  key={l}
                  className="w-10 h-10 rounded-2xl bg-amber-500 text-white font-black text-xl flex items-center justify-center shadow-xs"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
            {page.data.items.map((item: any) => {
              const isSelected = !!selectedLetters[item.id];
              return (
                <button
                  key={item.id}
                  onClick={() => handleToggleLetter(item.id, item.target)}
                  className={`h-16 sm:h-20 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl font-extrabold font-sans border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-200 border-amber-500 text-amber-950 scale-105 shadow-sm'
                      : 'bg-slate-50 hover:bg-amber-50 border-slate-200 text-slate-800'
                  }`}
                >
                  {item.char}
                </button>
              );
            })}
          </div>

          <div className="pt-2">
            <DrawingCanvas height={110} />
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // 8. FILL MISSING LETTER (HALAMAN 11)
  // -------------------------------------------------------------------------
  if (page.activityType === 'fill-missing-letter') {
    const handleSelectOption = (taskId: string, opt: string, correct: string) => {
      setFilledBlanks((prev) => ({ ...prev, [taskId]: opt }));
      if (opt === correct) {
        soundFx.playCorrect();
      } else {
        soundFx.playPop();
      }
    };

    return (
      <div className="w-full max-w-2xl mx-auto space-y-5">
        <KikoMascot message={page.kikoMessage} soundText={page.instruction} />

        <div className="bg-white rounded-3xl border-4 border-amber-300 p-6 sm:p-8 shadow-md space-y-6">
          <div className="space-y-6">
            {page.data.tasks.map((t: any) => {
              const currentChoice = filledBlanks[t.id];
              const isDone = currentChoice === t.missing;

              return (
                <div
                  key={t.id}
                  className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border-2 border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{t.emoji}</span>
                    <div className="text-2xl sm:text-3xl font-extrabold font-sans text-slate-800 tracking-wider">
                      <span className="underline decoration-amber-500 decoration-4 text-amber-700">
                        {currentChoice || '_'}
                      </span>
                      <span>{t.suffix}</span>
                    </div>
                  </div>

                  {/* Options */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500 mr-1">Pilih:</span>
                    {t.options.map((opt: string) => (
                      <button
                        key={opt}
                        onClick={() => handleSelectOption(t.id, opt, t.missing)}
                        className={`w-11 h-11 rounded-xl text-lg font-extrabold font-sans border-2 transition-transform cursor-pointer ${
                          currentChoice === opt
                            ? opt === t.missing
                              ? 'bg-emerald-500 text-white border-emerald-600 scale-110 shadow-sm'
                              : 'bg-rose-500 text-white border-rose-600'
                            : 'bg-white hover:bg-amber-100 text-slate-800 border-amber-300'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2">
            <DrawingCanvas height={110} />
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // 9. SOUND PHONICS (HALAMAN 15–18)
  // -------------------------------------------------------------------------
  if (page.activityType === 'sound-phonics') {
    const playPhonicSound = () => {
      soundFx.playPop();
      soundFx.speak(page.data.soundAudio);
    };

    return (
      <div className="w-full max-w-2xl mx-auto space-y-5">
        <KikoMascot message={page.kikoMessage} soundText={page.data.soundAudio} />

        <div className="bg-white rounded-3xl border-4 border-amber-300 p-6 sm:p-8 shadow-md space-y-6 text-center">
          {/* Big Letter & Sound Card */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-sky-50 via-amber-50 to-orange-50 border-2 border-amber-200 shadow-inner flex flex-col items-center space-y-3">
            <span className="text-6xl sm:text-8xl font-black font-sans text-amber-900 tracking-wider">
              {page.data.letter}
            </span>
            <div className="px-5 py-2 rounded-2xl bg-amber-500 text-white font-extrabold text-xl sm:text-2xl shadow-sm">
              Bunyinya: {page.data.phonetic}
            </div>

            <div className="flex items-center justify-center gap-3 pt-3">
              <span className="text-4xl sm:text-5xl">{page.data.emoji}</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-800 font-heading">
                {page.data.word}
              </span>
            </div>
          </div>

          {/* Sound Button */}
          <div>
            <button
              onClick={playPhonicSound}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-base sm:text-lg shadow-md flex items-center gap-2 mx-auto transition-transform active:scale-95 cursor-pointer"
            >
              <Volume2 className="w-6 h-6" />
              <span>🔊 Dengarkan & Tirukan Suaranya</span>
            </button>
          </div>

          {/* Tracing space */}
          <div className="pt-2 text-left">
            <span className="text-xs font-bold text-slate-600 block mb-1">
              ✍️ Tebalkan huruf sambil membunyikannya:
            </span>
            <DrawingCanvas height={130} watermarkText={page.data.letter} />
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // 10. LISTEN CHOOSE (HALAMAN 19)
  // -------------------------------------------------------------------------
  if (page.activityType === 'listen-choose') {
    const handleChoice = (opt: string) => {
      setChosenOptions((prev) => ({ ...prev, [page.pageNumber]: opt }));
      if (opt === page.data.correctLetter) {
        soundFx.playCorrect();
        triggerConfetti();
      } else {
        soundFx.playPop();
      }
    };

    const currentChoice = chosenOptions[page.pageNumber];

    return (
      <div className="w-full max-w-2xl mx-auto space-y-5">
        <KikoMascot message={page.kikoMessage} soundText={page.instruction} />

        <div className="bg-white rounded-3xl border-4 border-amber-300 p-6 sm:p-8 shadow-md space-y-6 text-center">
          <div className="space-y-2">
            <span className="text-6xl sm:text-7xl block select-none">{page.data.emoji}</span>
            <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-amber-900">
              {page.data.question}
            </h3>
            <p className="text-sm font-bold text-slate-600">
              Kata: <span className="text-amber-700 underline text-lg">{page.data.word}</span>
            </p>
          </div>

          {/* Big Option Buttons */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 pt-2">
            {page.data.options.map((opt: string) => {
              const isSelected = currentChoice === opt;
              const isCorrect = opt === page.data.correctLetter;

              return (
                <button
                  key={opt}
                  onClick={() => handleChoice(opt)}
                  className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl text-3xl sm:text-4xl font-black font-sans border-4 transition-all cursor-pointer ${
                    isSelected
                      ? isCorrect
                        ? 'bg-emerald-500 text-white border-emerald-600 scale-110 shadow-lg'
                        : 'bg-rose-500 text-white border-rose-600'
                      : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300 shadow-sm'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {currentChoice === page.data.correctLetter && (
            <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-900 font-extrabold text-sm flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <span>Hebat! {page.data.word} dimulai dengan huruf {page.data.correctLetter}!</span>
            </div>
          )}

          <div className="pt-2">
            <DrawingCanvas height={110} />
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // 11. INITIAL SOUND (HALAMAN 20)
  // -------------------------------------------------------------------------
  if (page.activityType === 'initial-sound') {
    const handlePickInitial = (itemId: string, opt: string, answer: string) => {
      setChosenOptions((prev) => ({ ...prev, [itemId]: opt }));
      if (opt === answer) {
        soundFx.playCorrect();
      } else {
        soundFx.playPop();
      }
    };

    return (
      <div className="w-full max-w-2xl mx-auto space-y-5">
        <KikoMascot message={page.kikoMessage} soundText={page.instruction} />

        <div className="bg-white rounded-3xl border-4 border-amber-300 p-6 sm:p-8 shadow-md space-y-5">
          <div className="text-center mb-2">
            <h3 className="text-base sm:text-lg font-bold text-slate-800">
              Pilih huruf awal untuk setiap gambar di bawah ini:
            </h3>
          </div>

          <div className="space-y-3">
            {page.data.items.map((item: any) => {
              const currentChoice = chosenOptions[item.id];
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 sm:p-4 rounded-2xl bg-amber-50/60 border border-amber-200 gap-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{item.emoji}</span>
                    <span className="font-extrabold text-slate-800 text-base sm:text-lg font-heading">
                      {item.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.options.map((opt: string) => {
                      const isSelected = currentChoice === opt;
                      const isCorrect = opt === item.answer;

                      return (
                        <button
                          key={opt}
                          onClick={() => handlePickInitial(item.id, opt, item.answer)}
                          className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl text-lg font-black font-sans border-2 transition-transform cursor-pointer ${
                            isSelected
                              ? isCorrect
                                ? 'bg-emerald-500 text-white border-emerald-600 scale-105 shadow-sm'
                                : 'bg-rose-500 text-white border-rose-600'
                              : 'bg-white hover:bg-amber-100 text-slate-800 border-amber-300'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // 12. SYLLABLE LEARN (HALAMAN 22–29)
  // -------------------------------------------------------------------------
  if (page.activityType === 'syllable-learn') {
    const handleSyllableAudio = (sound: string) => {
      soundFx.playPop();
      soundFx.speak(sound);
    };

    return (
      <div className="w-full max-w-2xl mx-auto space-y-5">
        <KikoMascot message={page.kikoMessage} soundText={page.instruction} />

        <div className="bg-white rounded-3xl border-4 border-amber-300 p-6 sm:p-8 shadow-md space-y-6">
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-black font-heading text-amber-900">
              Keluarga Huruf {page.data.family}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold">
              Klik setiap kartu suku kata untuk mendengarkan bunyinya!
            </p>
          </div>

          {/* Big 5 Syllable Cards */}
          <div className="grid grid-cols-5 gap-2 sm:gap-3">
            {page.data.syllables.map((s: any) => (
              <button
                key={s.syl}
                onClick={() => handleSyllableAudio(s.sound)}
                className="flex flex-col items-center justify-center p-2 sm:p-4 rounded-2xl bg-gradient-to-b from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 border-2 border-amber-300 hover:border-amber-400 shadow-sm transition-transform active:scale-95 cursor-pointer group"
              >
                <span className="text-2xl sm:text-3xl font-black font-sans text-amber-950 group-hover:text-amber-800">
                  {s.syl}
                </span>
                <span className="text-[11px] sm:text-xs text-slate-600 font-semibold mt-1 truncate max-w-full">
                  {s.example}
                </span>
                <Volume2 className="w-3.5 h-3.5 text-amber-500 mt-1 opacity-70 group-hover:opacity-100" />
              </button>
            ))}
          </div>

          {/* Tracing / writing guide */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-bold text-slate-600 block">
              ✍️ Tebalkan deretan suku kata ini:
            </span>
            <DrawingCanvas
              height={140}
              watermarkText={page.data.syllables.map((s: any) => s.syl).join(' ')}
            />
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // 13. SYLLABLE MATCH (HALAMAN 30)
  // -------------------------------------------------------------------------
  if (page.activityType === 'syllable-match') {
    const handleConnect = (id: string) => {
      setConnectedPairs((prev) => {
        const next = { ...prev, [id]: id };
        soundFx.playCorrect();
        return next;
      });
    };

    return (
      <div className="w-full max-w-2xl mx-auto space-y-5">
        <KikoMascot message={page.kikoMessage} soundText={page.instruction} />

        <div className="bg-white rounded-3xl border-4 border-amber-300 p-6 sm:p-8 shadow-md space-y-6">
          <div className="text-center">
            <h3 className="text-base sm:text-lg font-bold text-slate-800">
              Pasangkan suku kata dengan kata dan gambarnya!
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {page.data.pairs.map((p: any) => {
              const isMatched = !!connectedPairs[p.id];
              return (
                <button
                  key={p.id}
                  onClick={() => handleConnect(p.id)}
                  className={`p-4 rounded-2xl border-2 flex items-center justify-between transition-all cursor-pointer ${
                    isMatched
                      ? 'bg-emerald-50 border-emerald-500 shadow-sm'
                      : 'bg-amber-50/70 hover:bg-amber-100 border-amber-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-black font-sans text-amber-900 bg-white px-3 py-1 rounded-xl border border-amber-300">
                      {p.syllable}
                    </span>
                    <span className="text-xl font-extrabold text-slate-800">
                      → {p.word}
                    </span>
                  </div>
                  <span className="text-3xl">{p.emoji}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2">
            <DrawingCanvas height={110} />
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // 14. SYLLABLE ASSEMBLE (HALAMAN 31, 38)
  // -------------------------------------------------------------------------
  if (page.activityType === 'syllable-assemble') {
    const handleAssemble = (id: string, word: string) => {
      setFilledBlanks((prev) => ({ ...prev, [id]: word }));
      soundFx.playCorrect();
      soundFx.speak(word);
    };

    return (
      <div className="w-full max-w-2xl mx-auto space-y-5">
        <KikoMascot message={page.kikoMessage} soundText={page.instruction} />

        <div className="bg-white rounded-3xl border-4 border-amber-300 p-6 sm:p-8 shadow-md space-y-6">
          <div className="space-y-4">
            {page.data.equations.map((eq: any) => {
              const isDone = !!filledBlanks[eq.id];

              return (
                <div
                  key={eq.id}
                  className="p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 flex items-center justify-between gap-3 flex-wrap"
                >
                  {/* Suku kata 1 + 2 */}
                  <div className="flex items-center gap-2 text-xl sm:text-2xl font-black font-sans text-amber-950">
                    <span className="bg-white px-3 py-1 rounded-xl border border-amber-300 shadow-xs">
                      {eq.s1}
                    </span>
                    <span>+</span>
                    <span className="bg-white px-3 py-1 rounded-xl border border-amber-300 shadow-xs">
                      {eq.s2}
                    </span>
                    <span>=</span>
                  </div>

                  {/* Result Button */}
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{eq.emoji}</span>
                    <button
                      onClick={() => handleAssemble(eq.id, eq.word)}
                      className={`px-4 py-2 rounded-xl text-lg sm:text-xl font-black font-sans transition-all cursor-pointer ${
                        isDone
                          ? 'bg-emerald-500 text-white shadow-sm'
                          : 'bg-amber-500 hover:bg-amber-600 text-white shadow-xs'
                      }`}
                    >
                      {isDone ? eq.word : 'Gabungkan!'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2">
            <span className="text-xs font-bold text-slate-500 block mb-1">
              ✍️ Tulis kata lengkapnya di sini:
            </span>
            <DrawingCanvas height={130} />
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // 15. WORD READ (HALAMAN 33–36)
  // -------------------------------------------------------------------------
  if (page.activityType === 'word-read') {
    const handleWordAudio = (word: string, sound: string) => {
      soundFx.playPop();
      soundFx.speak(sound || word);
    };

    return (
      <div className="w-full max-w-2xl mx-auto space-y-5">
        <KikoMascot message={page.kikoMessage} soundText={page.instruction} />

        <div className="bg-white rounded-3xl border-4 border-amber-300 p-6 sm:p-8 shadow-md space-y-6">
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-amber-900">
              Ayo Membaca Kata!
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold">
              Klik kartu kata untuk mendengarkan lafal pemisahan suku katanya:
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {page.data.words.map((w: any) => (
              <button
                key={w.word}
                onClick={() => handleWordAudio(w.word, w.sound)}
                className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-amber-50 via-white to-orange-50 border-2 border-amber-200 hover:border-amber-400 shadow-sm flex flex-col items-center justify-center space-y-2 transition-transform active:scale-95 cursor-pointer group"
              >
                <span className="text-4xl sm:text-5xl select-none">{w.emoji}</span>
                <div className="flex items-center gap-1 font-black font-sans text-xl sm:text-2xl">
                  <span className="text-amber-800">{w.s1}</span>
                  <span className="text-slate-400">-</span>
                  <span className="text-orange-700">{w.s2}</span>
                </div>
                <div className="text-xs font-bold text-slate-500 flex items-center gap-1 group-hover:text-amber-700">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Dengarkan</span>
                </div>
              </button>
            ))}
          </div>

          <div className="pt-2">
            <span className="text-xs font-bold text-slate-600 block mb-1">
              ✍️ Latihan menulis kata:
            </span>
            <DrawingCanvas
              height={140}
              watermarkText={page.data.words.map((w: any) => w.word).join('  ')}
            />
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // 16. WORD MATCH (HALAMAN 37)
  // -------------------------------------------------------------------------
  if (page.activityType === 'word-match') {
    const handleMatchWord = (id: string) => {
      setConnectedPairs((prev) => {
        const next = { ...prev, [id]: id };
        soundFx.playCorrect();
        return next;
      });
    };

    return (
      <div className="w-full max-w-2xl mx-auto space-y-5">
        <KikoMascot message={page.kikoMessage} soundText={page.instruction} />

        <div className="bg-white rounded-3xl border-4 border-amber-300 p-6 sm:p-8 shadow-md space-y-6">
          <div className="text-center">
            <h3 className="text-base sm:text-lg font-bold text-slate-800">
              Pasangkan kata dengan gambar yang tepat!
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {page.data.pairs.map((p: any) => {
              const isDone = !!connectedPairs[p.id];
              return (
                <button
                  key={p.id}
                  onClick={() => handleMatchWord(p.id)}
                  className={`p-4 rounded-2xl border-2 flex items-center justify-between transition-all cursor-pointer ${
                    isDone
                      ? 'bg-emerald-50 border-emerald-500 shadow-sm'
                      : 'bg-slate-50 hover:bg-amber-50 border-slate-200'
                  }`}
                >
                  <span className="text-xl sm:text-2xl font-black font-sans text-amber-950">
                    {p.word}
                  </span>
                  <span className="text-3xl sm:text-4xl">{p.emoji}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2">
            <DrawingCanvas height={110} />
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // 17. WORD MISSING (HALAMAN 39)
  // -------------------------------------------------------------------------
  if (page.activityType === 'word-missing') {
    const handlePickMissing = (itemId: string, opt: string, answer: string) => {
      setFilledBlanks((prev) => ({ ...prev, [itemId]: opt }));
      if (opt === answer) {
        soundFx.playCorrect();
      } else {
        soundFx.playPop();
      }
    };

    return (
      <div className="w-full max-w-2xl mx-auto space-y-5">
        <KikoMascot message={page.kikoMessage} soundText={page.instruction} />

        <div className="bg-white rounded-3xl border-4 border-amber-300 p-6 sm:p-8 shadow-md space-y-5">
          <div className="text-center">
            <h3 className="text-base sm:text-lg font-bold text-slate-800">
              Lengkapi huruf yang hilang di dalam kata:
            </h3>
          </div>

          <div className="space-y-3">
            {page.data.items.map((it: any) => {
              const currentChoice = filledBlanks[it.id];
              return (
                <div
                  key={it.id}
                  className="flex items-center justify-between p-3 sm:p-4 rounded-2xl bg-amber-50/60 border border-amber-200"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{it.emoji}</span>
                    <span className="text-xl sm:text-2xl font-black font-sans text-slate-800 tracking-wider">
                      {it.pattern}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {it.options.map((opt: string) => {
                      const isSelected = currentChoice === opt;
                      const isCorrect = opt === it.missing;

                      return (
                        <button
                          key={opt}
                          onClick={() => handlePickMissing(it.id, opt, it.missing)}
                          className={`w-10 h-10 rounded-xl text-lg font-black font-sans border-2 transition-transform cursor-pointer ${
                            isSelected
                              ? isCorrect
                                ? 'bg-emerald-500 text-white border-emerald-600 scale-105'
                                : 'bg-rose-500 text-white border-rose-600'
                              : 'bg-white hover:bg-amber-100 text-slate-800 border-amber-300'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // 18. WORD FIND SAME (HALAMAN 40)
  // -------------------------------------------------------------------------
  if (page.activityType === 'word-find-same') {
    const handleToggleSameWord = (id: string, isSame: boolean) => {
      setSelectedLetters((prev) => {
        const next = { ...prev, [id]: !prev[id] };
        if (!prev[id] && isSame) {
          soundFx.playCorrect();
        } else {
          soundFx.playPop();
        }
        return next;
      });
    };

    return (
      <div className="w-full max-w-2xl mx-auto space-y-5">
        <KikoMascot message={page.kikoMessage} soundText={page.instruction} />

        <div className="bg-white rounded-3xl border-4 border-amber-300 p-6 sm:p-8 shadow-md space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Kata Kunci yang Dicari:
            </span>
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-2xl bg-amber-500 text-white text-2xl sm:text-3xl font-black font-sans shadow-sm">
              <span>{page.data.emoji}</span>
              <span>{page.data.targetWord}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {page.data.words.map((w: any) => {
              const isSelected = !!selectedLetters[w.id];

              return (
                <button
                  key={w.id}
                  onClick={() => handleToggleSameWord(w.id, w.isSame)}
                  className={`p-4 rounded-2xl text-xl sm:text-2xl font-black font-sans border-2 transition-all cursor-pointer ${
                    isSelected
                      ? w.isSame
                        ? 'bg-emerald-500 text-white border-emerald-600 scale-105 shadow-sm'
                        : 'bg-rose-500 text-white border-rose-600'
                      : 'bg-slate-50 hover:bg-amber-50 border-slate-200 text-slate-800'
                  }`}
                >
                  {w.text}
                </button>
              );
            })}
          </div>

          <div className="pt-2">
            <DrawingCanvas height={110} />
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // 19. WORD CHOOSE IMAGE (HALAMAN 41, 42)
  // -------------------------------------------------------------------------
  if (page.activityType === 'word-choose-image') {
    const handleSelectWord = (opt: string) => {
      setChosenOptions((prev) => ({ ...prev, [page.pageNumber]: opt }));
      if (opt === page.data.target) {
        soundFx.playCorrect();
        soundFx.speak(opt);
        triggerConfetti();
      } else {
        soundFx.playPop();
      }
    };

    const currentChoice = chosenOptions[page.pageNumber];

    return (
      <div className="w-full max-w-2xl mx-auto space-y-5">
        <KikoMascot message={page.kikoMessage} soundText={page.instruction} />

        <div className="bg-white rounded-3xl border-4 border-amber-300 p-6 sm:p-8 shadow-md space-y-6 text-center">
          <span className="text-7xl sm:text-8xl block select-none">{page.data.emoji}</span>
          <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-slate-800">
            {page.data.question}
          </h3>

          <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap pt-2">
            {page.data.options.map((opt: string) => {
              const isSelected = currentChoice === opt;
              const isCorrect = opt === page.data.target;

              return (
                <button
                  key={opt}
                  onClick={() => handleSelectWord(opt)}
                  className={`px-6 py-3.5 rounded-2xl text-xl sm:text-2xl font-black font-sans border-2 transition-all cursor-pointer ${
                    isSelected
                      ? isCorrect
                        ? 'bg-emerald-500 text-white border-emerald-600 scale-105 shadow-md'
                        : 'bg-rose-500 text-white border-rose-600'
                      : 'bg-amber-50 hover:bg-amber-100 text-amber-950 border-amber-300 shadow-xs'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          <div className="pt-2">
            <DrawingCanvas height={110} />
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // 20. SENTENCE READ (HALAMAN 44–50)
  // -------------------------------------------------------------------------
  if (page.activityType === 'sentence-read') {
    const speakSentence = () => {
      soundFx.playPop();
      soundFx.speak(page.data.audioText || page.data.sentence);
    };

    return (
      <div className="w-full max-w-2xl mx-auto space-y-5">
        <KikoMascot message={page.kikoMessage} soundText={page.data.audioText} />

        <div className="bg-white rounded-3xl border-4 border-amber-300 p-6 sm:p-8 shadow-md space-y-6 text-center">
          {/* Big Illustration */}
          <div className="w-28 h-28 sm:w-36 sm:h-36 mx-auto rounded-3xl bg-amber-50 border-2 border-amber-200 flex items-center justify-center text-6xl sm:text-7xl shadow-inner">
            {page.data.emoji}
          </div>

          {/* Big Clear Sentence Display */}
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-amber-100/70 via-orange-50 to-amber-100/70 border-2 border-amber-300 shadow-xs">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-sans text-amber-950 tracking-wide">
              {page.data.sentence}
            </h2>
          </div>

          {/* Audio Button */}
          <div>
            <button
              onClick={speakSentence}
              className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-base sm:text-lg shadow-md flex items-center gap-2 mx-auto transition-transform active:scale-95 cursor-pointer"
            >
              <Volume2 className="w-5 h-5" />
              <span>🔊 Dengarkan Kiko Membaca</span>
            </button>
          </div>

          {/* Tracing / Handwriting Space */}
          <div className="pt-2 text-left">
            <span className="text-xs font-bold text-slate-600 block mb-1">
              ✍️ Tebalkan atau tulis kalimat di bawah ini:
            </span>
            <DrawingCanvas height={130} watermarkText={page.data.sentence} />
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // 21. SENTENCE ASSEMBLE (HALAMAN 51)
  // -------------------------------------------------------------------------
  if (page.activityType === 'sentence-assemble') {
    const handlePickWordCard = (w: string) => {
      soundFx.playPop();
      if (!sentenceCards.includes(w)) {
        const next = [...sentenceCards, w];
        setSentenceCards(next);
        if (next.join(' ') === page.data.targetSentence) {
          soundFx.playCorrect();
          soundFx.speak(page.data.targetSentence);
          triggerConfetti();
        }
      }
    };

    const handleResetCards = () => {
      soundFx.playPop();
      setSentenceCards([]);
    };

    const isMatch = sentenceCards.join(' ') === page.data.targetSentence;

    return (
      <div className="w-full max-w-2xl mx-auto space-y-5">
        <KikoMascot message={page.kikoMessage} soundText={page.instruction} />

        <div className="bg-white rounded-3xl border-4 border-amber-300 p-6 sm:p-8 shadow-md space-y-6 text-center">
          <span className="text-6xl block select-none">{page.data.emoji}</span>

          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-amber-900">
              Susun Kartu Kata Menjadi Kalimat:
            </h3>
            <p className="text-sm font-bold text-amber-700">
              Target: “{page.data.targetSentence}.”
            </p>
          </div>

          {/* Assembly Slots */}
          <div className="min-h-16 p-4 rounded-2xl bg-amber-50 border-2 border-dashed border-amber-300 flex items-center justify-center gap-3 flex-wrap">
            {sentenceCards.length === 0 ? (
              <span className="text-slate-400 font-bold text-sm">
                (Klik kartu kata di bawah untuk menyusun di sini)
              </span>
            ) : (
              sentenceCards.map((w, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-white font-black font-sans text-lg sm:text-xl shadow-xs"
                >
                  {w}
                </span>
              ))
            )}
          </div>

          {/* Cards to choose */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {page.data.cards.map((c: string) => {
              const isUsed = sentenceCards.includes(c);
              return (
                <button
                  key={c}
                  disabled={isUsed}
                  onClick={() => handlePickWordCard(c)}
                  className={`px-5 py-3 rounded-2xl text-lg sm:text-xl font-black font-sans border-2 transition-all cursor-pointer ${
                    isUsed
                      ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                      : 'bg-white hover:bg-amber-100 text-slate-800 border-amber-300 shadow-sm active:scale-95'
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>

          {sentenceCards.length > 0 && (
            <div>
              <button
                onClick={handleResetCards}
                className="text-xs font-bold text-slate-500 hover:text-slate-700 underline cursor-pointer"
              >
                Ulangi susunan kartu
              </button>
            </div>
          )}

          {isMatch && (
            <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-900 font-extrabold text-base flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <span>Hebat! Susunan kalimatmu sempurna! 👏</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // 22. STORY QUIZ (HALAMAN 53–56)
  // -------------------------------------------------------------------------
  if (page.activityType === 'story-quiz') {
    const handleAnswerQuiz = (qId: string, opt: string, answer: string) => {
      setChosenOptions((prev) => ({ ...prev, [qId]: opt }));
      if (opt === answer) {
        soundFx.playCorrect();
      } else {
        soundFx.playPop();
      }
    };

    const speakStory = () => {
      soundFx.playPop();
      soundFx.speak(page.data.paragraphs.join('. '));
    };

    return (
      <div className="w-full max-w-2xl mx-auto space-y-5">
        <KikoMascot message={page.kikoMessage} soundText={page.instruction} />

        <div className="bg-white rounded-3xl border-4 border-amber-300 p-6 sm:p-8 shadow-md space-y-6">
          {/* Story Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-b from-amber-50 via-white to-orange-50 border-2 border-amber-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-amber-200 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-3xl">{page.data.emoji}</span>
                <h3 className="text-xl sm:text-2xl font-black font-heading text-amber-900">
                  {page.data.storyTitle}
                </h3>
              </div>
              <button
                onClick={speakStory}
                className="px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs flex items-center gap-1 cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-amber-700" />
                <span>Bacakan</span>
              </button>
            </div>

            <div className="space-y-2 py-2 text-center">
              {page.data.paragraphs.map((p: string, i: number) => (
                <p
                  key={i}
                  className="text-2xl sm:text-3xl font-black font-sans text-slate-800 tracking-wide leading-relaxed"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* Comprehension Questions */}
          <div className="space-y-4 pt-1">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-700">
              Pertanyaan Pemahaman Bacaan:
            </h4>

            {page.data.questions.map((q: any) => {
              const currentChoice = chosenOptions[q.id];
              return (
                <div key={q.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <p className="font-bold text-slate-800 text-sm sm:text-base">{q.question}</p>
                  <div className="flex items-center gap-3">
                    {q.options.map((opt: string) => {
                      const isSelected = currentChoice === opt;
                      const isCorrect = opt === q.answer;

                      return (
                        <button
                          key={opt}
                          onClick={() => handleAnswerQuiz(q.id, opt, q.answer)}
                          className={`px-4 py-2 rounded-xl text-base font-black font-sans border-2 transition-transform cursor-pointer ${
                            isSelected
                              ? isCorrect
                                ? 'bg-emerald-500 text-white border-emerald-600 scale-105'
                                : 'bg-rose-500 text-white border-rose-600'
                              : 'bg-white hover:bg-amber-100 text-slate-800 border-amber-300'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // 23. FINAL MISSION (HALAMAN 57–58)
  // -------------------------------------------------------------------------
  if (page.activityType === 'final-mission') {
    const handleToggleMission = (id: string) => {
      setCompletedMissions((prev) => {
        const next = { ...prev, [id]: !prev[id] };
        if (!prev[id]) {
          soundFx.playCorrect();
        } else {
          soundFx.playPop();
        }
        return next;
      });
    };

    return (
      <div className="w-full max-w-2xl mx-auto space-y-5">
        <KikoMascot message={page.kikoMessage} soundText={page.instruction} />

        <div className="bg-white rounded-3xl border-4 border-amber-300 p-6 sm:p-8 shadow-md space-y-6">
          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl font-black font-heading text-amber-900">
              {page.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">
              Baca materi di bawah ini dengan suara lantang, lalu centang kotaknya!
            </p>
          </div>

          <div className="space-y-4">
            {page.data.missions.map((m: any) => {
              const isChecked = !!completedMissions[m.id];

              return (
                <div
                  key={m.id}
                  className={`p-4 sm:p-5 rounded-2xl border-2 transition-all ${
                    isChecked
                      ? 'bg-emerald-50/80 border-emerald-500 shadow-sm'
                      : 'bg-amber-50/60 border-amber-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-extrabold text-sm sm:text-base text-amber-950 flex items-center gap-1.5">
                      <TargetIcon className="w-4 h-4 text-amber-600" />
                      {m.label}
                    </span>

                    <button
                      onClick={() => handleToggleMission(m.id)}
                      className={`px-3 py-1.5 rounded-xl font-extrabold text-xs flex items-center gap-1 transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-emerald-500 text-white shadow-xs'
                          : 'bg-white hover:bg-amber-100 text-slate-700 border border-slate-300'
                      }`}
                    >
                      {isChecked ? '✓ Berhasil Dibaca!' : 'Centang Jika Sudah'}
                    </button>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap pt-1">
                    {m.items.map((item: string, idx: number) => (
                      <span
                        key={idx}
                        onClick={() => {
                          soundFx.playPop();
                          soundFx.speak(item);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-white border border-amber-300 font-black font-sans text-base sm:text-lg text-slate-800 shadow-2xs hover:bg-amber-50 cursor-pointer"
                        title="Klik untuk mendengarkan lafalnya"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // 24. REWARD PAGES (HALAMAN 14, 21, 32, 43, 52)
  // -------------------------------------------------------------------------
  if (page.activityType === 'reward') {
    const handleStarClick = (index: number) => {
      soundFx.playStar();
      if (!rewardStars.includes(index)) {
        setRewardStars((prev) => [...prev, index]);
        triggerConfetti();
      }
    };

    return (
      <div className="w-full max-w-2xl mx-auto space-y-6 text-center">
        <KikoMascot message={page.kikoMessage} />

        <div className="bg-gradient-to-b from-amber-50 via-white to-orange-50 rounded-3xl border-4 border-amber-400 p-6 sm:p-10 shadow-xl space-y-6">
          <div className="space-y-2">
            <span className="text-5xl sm:text-6xl select-none block animate-bounce">
              {page.data.badgeIcon}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-heading text-amber-900 tracking-tight">
              {page.title}
            </h2>
            <p className="text-base sm:text-lg font-bold text-amber-700">
              {page.data.message}
            </p>
          </div>

          {/* Badge Display */}
          <div className="inline-block p-4 sm:p-6 rounded-3xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 border-4 border-amber-600 shadow-lg text-white">
            <span className="text-xs font-black uppercase tracking-widest text-amber-950 block">
              LENCANA RESMI
            </span>
            <span className="text-2xl sm:text-3xl font-black font-heading text-amber-950">
              {page.data.badgeName}
            </span>
          </div>

          {/* Interactive Stars Box */}
          <div className="p-4 rounded-2xl bg-amber-100/60 border-2 border-dashed border-amber-300 max-w-md mx-auto space-y-2">
            <span className="text-xs font-bold text-amber-900 block">
              Klik bintang di bawah untuk menempelkannya:
            </span>
            <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
              {Array.from({ length: page.data.starCount }).map((_, idx) => {
                const isStuck = rewardStars.includes(idx);
                return (
                  <button
                    key={idx}
                    onClick={() => handleStarClick(idx)}
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-3xl transition-transform cursor-pointer ${
                      isStuck
                        ? 'bg-amber-400 scale-110 shadow-md rotate-6'
                        : 'bg-white hover:bg-amber-50 border-2 border-amber-300 opacity-60'
                    }`}
                  >
                    ⭐
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <button
              onClick={() => {
                soundFx.playCorrect();
                onNextPage();
              }}
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base shadow-md transition-transform active:scale-95 cursor-pointer"
            >
              Lanjut ke Level Berikutnya! 🚀
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // 25. PARTY (HALAMAN 59)
  // -------------------------------------------------------------------------
  if (page.activityType === 'party') {
    return (
      <div className="w-full max-w-2xl mx-auto space-y-6 text-center">
        <KikoMascot message={page.kikoMessage} />

        <div className="bg-gradient-to-b from-amber-50 via-white to-pink-50 rounded-3xl border-4 border-amber-400 p-6 sm:p-10 shadow-xl space-y-6">
          <div className="space-y-2">
            <span className="text-6xl sm:text-7xl block animate-bounce">🏆</span>
            <h2 className="text-3xl sm:text-5xl font-black font-heading text-amber-900 tracking-tight">
              🎉 SELAMAT! 🎉
            </h2>
            <p className="text-lg sm:text-2xl font-black text-amber-700 font-heading">
              {page.data.subheading}
            </p>
          </div>

          {/* Golden Big Medal */}
          <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-200 to-amber-500 border-8 border-amber-600 shadow-2xl mx-auto flex flex-col items-center justify-center text-amber-950 p-4 relative">
            <Trophy className="w-16 h-16 sm:w-20 sm:h-20 text-amber-900" />
            <span className="text-xs sm:text-sm font-black text-center uppercase tracking-tight">
              {page.data.medalTitle}
            </span>
          </div>

          {/* 10 Stars */}
          <div className="flex items-center justify-center gap-1 sm:gap-2 flex-wrap text-2xl sm:text-3xl">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="animate-pulse" style={{ animationDelay: `${i * 100}ms` }}>
                ⭐
              </span>
            ))}
          </div>

          <div>
            <button
              onClick={() => {
                soundFx.playFanfare();
                triggerConfetti();
                onNextPage();
              }}
              className="px-8 py-4 rounded-3xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-lg sm:text-xl shadow-lg transition-transform active:scale-95 cursor-pointer"
            >
              🎓 Ambil Sertifikat Kelulusanmu! 📜
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // 26. CERTIFICATE (HALAMAN 60)
  // -------------------------------------------------------------------------
  if (page.activityType === 'certificate') {
    return (
      <div className="w-full max-w-2xl mx-auto space-y-4">
        <KikoMascot message={page.kikoMessage} />
        <CertificateView
          profile={profile}
          onUpdateProfile={onUpdateProfile}
          onPrint={onPrintCertificate}
        />
      </div>
    );
  }

  return <div>Halaman sedang disiapkan.</div>;
};

// Target icon mini
function TargetIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
