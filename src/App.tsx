import React, { useState, useEffect } from 'react';
import { WorksheetHeader } from './components/WorksheetHeader';
import { PageRenderer } from './components/PageRenderer';
import { PageNavigation } from './components/PageNavigation';
import { ParentModal } from './components/ParentModal';
import { PrintableWorksheet } from './components/PrintableWorksheet';
import { worksheetPages } from './data/worksheetData';
import { StudentProfile, ProgressAssessment } from './types';
import { soundFx } from './utils/audio';

const STORAGE_KEY_PROFILE = 'kiko_reader_profile_v1';
const STORAGE_KEY_PROGRESS = 'kiko_reader_assessment_v1';
const STORAGE_KEY_PAGE = 'kiko_reader_last_page_v1';

export default function App() {
  // Current Page Index (0 to 59)
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PAGE);
      if (saved !== null) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed >= 0 && parsed < worksheetPages.length) {
          return parsed;
        }
      }
    } catch {}
    return 0;
  });

  // Student Profile
  const [profile, setProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROFILE);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {}
    return {
      name: '',
      age: '',
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      avatar: '🐰',
    };
  });

  // Progress Assessment for Parents & Teachers
  const [assessment, setAssessment] = useState<ProgressAssessment>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROGRESS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {}
    return {
      mengenalHuruf: 'mulai',
      mengenalBunyi: 'belum',
      membacaSukuKata: 'belum',
      membacaKata: 'belum',
      membacaKalimat: 'belum',
      membacaCerita: 'belum',
      notes: '',
    };
  });

  const [isParentModalOpen, setIsParentModalOpen] = useState(false);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PAGE, currentPageIndex.toString());
    } catch {}
  }, [currentPageIndex]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
    } catch {}
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(assessment));
    } catch {}
  }, [assessment]);

  const handleSelectPage = (index: number) => {
    if (index >= 0 && index < worksheetPages.length) {
      setCurrentPageIndex(index);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectPageByNumber = (pageNum: number) => {
    const idx = pageNum - 1;
    handleSelectPage(idx);
  };

  const handleNext = () => {
    if (currentPageIndex < worksheetPages.length - 1) {
      handleSelectPage(currentPageIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentPageIndex > 0) {
      handleSelectPage(currentPageIndex - 1);
    }
  };

  const handlePrintAll = () => {
    soundFx.playPop();
    window.print();
  };

  const currentPage = worksheetPages[currentPageIndex];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50/50 via-orange-50/20 to-sky-50/40 text-slate-800">
      {/* Interactive Digital Header */}
      <WorksheetHeader
        currentPageIndex={currentPageIndex}
        onSelectPage={handleSelectPage}
        onOpenParentModal={() => setIsParentModalOpen(true)}
        onPrintAll={handlePrintAll}
      />

      {/* Main Interactive Stage */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-6 flex flex-col items-center justify-between no-print">
        {/* Page Container */}
        <div className="w-full flex-1 flex flex-col items-center">
          <PageRenderer
            page={currentPage}
            profile={profile}
            onUpdateProfile={setProfile}
            onSelectPageByNumber={handleSelectPageByNumber}
            onNextPage={handleNext}
            onPrintCertificate={handlePrintAll}
          />
        </div>

        {/* Bottom Navigation */}
        <PageNavigation
          currentPageIndex={currentPageIndex}
          onPrev={handlePrev}
          onNext={handleNext}
          onSelectPage={handleSelectPage}
        />
      </main>

      {/* Footer info (non-print) */}
      <footer className="py-3 text-center text-xs font-semibold text-slate-400 no-print border-t border-amber-100/80 bg-white/40">
        <p>
          🌈 “Petualangan Jadi Pembaca Hebat” — Worksheet Digital & Cetak untuk Anak Usia 4–7 Tahun
        </p>
      </footer>

      {/* Guidance and Answer Key Modal for Parents and Teachers */}
      <ParentModal
        isOpen={isParentModalOpen}
        onClose={() => setIsParentModalOpen(false)}
        assessment={assessment}
        onUpdateAssessment={setAssessment}
        onPrintAll={handlePrintAll}
      />

      {/* Hidden container formatted specifically for clean A4 printing */}
      <PrintableWorksheet profile={profile} />
    </div>
  );
}
