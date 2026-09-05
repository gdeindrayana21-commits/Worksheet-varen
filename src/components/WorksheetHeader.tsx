import React, { useState } from 'react';
import { Volume2, VolumeX, Grid, Users, Printer, BookMarked, Sparkles } from 'lucide-react';
import { worksheetPages } from '../data/worksheetData';
import { soundFx } from '../utils/audio';

interface WorksheetHeaderProps {
  currentPageIndex: number;
  onSelectPage: (index: number) => void;
  onOpenParentModal: () => void;
  onPrintAll: () => void;
}

export const WorksheetHeader: React.FC<WorksheetHeaderProps> = ({
  currentPageIndex,
  onSelectPage,
  onOpenParentModal,
  onPrintAll,
}) => {
  const [showGridModal, setShowGridModal] = useState(false);
  const [soundActive, setSoundActive] = useState(true);

  const currentPage = worksheetPages[currentPageIndex];
  const progressPercent = Math.round(((currentPageIndex + 1) / worksheetPages.length) * 100);

  const toggleSound = () => {
    const newState = !soundActive;
    setSoundActive(newState);
    soundFx.soundEnabled = newState;
    soundFx.speechEnabled = newState;
    if (newState) {
      soundFx.playPop();
    } else {
      soundFx.stopSpeech();
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200 shadow-xs no-print">
        <div className="max-w-5xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3">
          {/* Brand & Level Title */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                soundFx.playPop();
                onSelectPage(0);
              }}
              className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center font-bold shadow-sm transition-transform active:scale-95 cursor-pointer text-lg flex-shrink-0"
              title="Kembali ke Sampul"
            >
              🌈
            </button>
            <div className="min-w-0">
              <h1 className="text-sm sm:text-base font-bold font-heading text-slate-800 tracking-tight truncate flex items-center gap-1.5">
                <span>PETUALANGAN JADI PEMBACA HEBAT</span>
                <span className="hidden md:inline-block text-amber-500">📚✨</span>
              </h1>
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span>{currentPage.levelIcon}</span>
                  <span className="truncate max-w-[130px] sm:max-w-none">{currentPage.levelTitle}</span>
                </span>
                <span className="text-slate-500 font-semibold hidden sm:inline">
                  Halaman {currentPage.pageNumber} dari {worksheetPages.length}
                </span>
              </div>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Quick Page Jump Grid Button */}
            <button
              onClick={() => {
                soundFx.playPop();
                setShowGridModal(true);
              }}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-amber-100/80 hover:bg-amber-200 text-amber-900 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Daftar 60 Halaman"
            >
              <Grid className="w-4 h-4 text-amber-700" />
              <span className="hidden sm:inline">Hal. {currentPage.pageNumber}/60</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                soundActive
                  ? 'bg-amber-100 hover:bg-amber-200 text-amber-900'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-500'
              }`}
              title={soundActive ? 'Matikan Suara' : 'Nyalakan Suara'}
            >
              {soundActive ? <Volume2 className="w-4 h-4 text-amber-700" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Print Button */}
            <button
              onClick={onPrintAll}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-sky-100 hover:bg-sky-200 text-sky-900 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Cetak Worksheet PDF (A4 Portrait)"
            >
              <Printer className="w-4 h-4 text-sky-700" />
              <span className="hidden md:inline">Cetak A4</span>
            </button>

            {/* Parents & Teachers Guidance */}
            <button
              onClick={onOpenParentModal}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-transform active:scale-95 cursor-pointer"
              title="Panduan Ortu, Guru, & Kunci Jawaban"
            >
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Guru & Ortu</span>
            </button>
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="w-full bg-amber-100/60 h-1.5 relative overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 transition-all duration-300 rounded-r-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </header>

      {/* Grid Jump Modal (All 60 pages selector) */}
      {showGridModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl border-4 border-amber-300 w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-150">
            <div className="bg-gradient-to-r from-amber-400 to-orange-400 text-white px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Grid className="w-5 h-5" />
                <h3 className="font-bold font-heading text-lg">Pilih Halaman (1 – 60)</h3>
              </div>
              <button
                onClick={() => {
                  soundFx.playPop();
                  setShowGridModal(false);
                }}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-4 sm:p-5 overflow-y-auto flex-1">
              <p className="text-xs text-slate-500 mb-3 font-medium">
                Klik salah satu nomor halaman untuk langsung melompat ke materi:
              </p>

              <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-2">
                {worksheetPages.map((page, idx) => {
                  const isCurrent = idx === currentPageIndex;
                  const isReward = page.activityType === 'reward' || page.activityType === 'party';
                  const isCert = page.activityType === 'certificate';

                  return (
                    <button
                      key={page.pageNumber}
                      onClick={() => {
                        soundFx.playPop();
                        onSelectPage(idx);
                        setShowGridModal(false);
                      }}
                      className={`h-11 rounded-xl flex flex-col items-center justify-center text-xs font-bold transition-transform active:scale-95 cursor-pointer relative ${
                        isCurrent
                          ? 'bg-amber-600 text-white ring-2 ring-offset-2 ring-amber-500 shadow-md'
                          : isReward
                          ? 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300'
                          : isCert
                          ? 'bg-purple-100 hover:bg-purple-200 text-purple-900 border border-purple-300'
                          : 'bg-slate-100 hover:bg-amber-50 text-slate-700 border border-slate-200'
                      }`}
                      title={`Hal ${page.pageNumber}: ${page.title}`}
                    >
                      <span className="text-[13px]">{page.pageNumber}</span>
                      <span className="text-[9px] leading-none opacity-80">{page.levelIcon}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
              <span>Tanda: ⭐ = Hadiah/Reward | 🏆 = Sertifikat</span>
              <button
                onClick={() => setShowGridModal(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
