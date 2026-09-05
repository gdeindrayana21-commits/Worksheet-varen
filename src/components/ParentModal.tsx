import React, { useState } from 'react';
import { X, BookOpen, Key, CheckCircle, Award, Printer, Lock } from 'lucide-react';
import { ProgressAssessment, SkillLevel } from '../types';
import { worksheetPages } from '../data/worksheetData';
import { soundFx } from '../utils/audio';

interface ParentModalProps {
  isOpen: boolean;
  onClose: () => void;
  assessment: ProgressAssessment;
  onUpdateAssessment: (newAssessment: ProgressAssessment) => void;
  onPrintAll: () => void;
}

export const ParentModal: React.FC<ParentModalProps> = ({
  isOpen,
  onClose,
  assessment,
  onUpdateAssessment,
  onPrintAll,
}) => {
  const [activeTab, setActiveTab] = useState<'panduan' | 'tabel' | 'kunci'>('panduan');
  const [unlockedKey, setUnlockedKey] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  if (!isOpen) return null;

  const handleLevelChange = (skill: keyof Omit<ProgressAssessment, 'notes'>, value: SkillLevel) => {
    soundFx.playPop();
    onUpdateAssessment({
      ...assessment,
      [skill]: value,
    });
  };

  const handleUnlockPin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple math challenge for parents (2 + 3 = 5)
    if (pinInput.trim() === '5') {
      soundFx.playCorrect();
      setUnlockedKey(true);
      setPinError(false);
    } else {
      soundFx.playPop();
      setPinError(true);
    }
  };

  const answerPages = worksheetPages.filter((p) => p.answerKey);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border-4 border-amber-300 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-xl">
              👨‍👩‍👧
            </div>
            <div>
              <h2 className="text-xl font-bold font-heading">Ruang Orang Tua & Guru</h2>
              <p className="text-xs text-amber-100">Panduan, Tabel Perkembangan, & Kunci Jawaban Resmi</p>
            </div>
          </div>
          <button
            onClick={() => {
              soundFx.playPop();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-amber-100 bg-amber-50/50 px-6 pt-3 gap-2 overflow-x-auto">
          <button
            onClick={() => {
              soundFx.playPop();
              setActiveTab('panduan');
            }}
            className={`px-4 py-2.5 rounded-t-2xl font-bold text-sm flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'panduan'
                ? 'bg-white text-amber-900 border-t-2 border-x-2 border-amber-300 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-amber-100/50'
            }`}
          >
            <BookOpen className="w-4 h-4 text-amber-600" />
            <span>Panduan Pendampingan</span>
          </button>

          <button
            onClick={() => {
              soundFx.playPop();
              setActiveTab('tabel');
            }}
            className={`px-4 py-2.5 rounded-t-2xl font-bold text-sm flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'tabel'
                ? 'bg-white text-amber-900 border-t-2 border-x-2 border-amber-300 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-amber-100/50'
            }`}
          >
            <Award className="w-4 h-4 text-amber-600" />
            <span>Tabel Perkembangan Anak</span>
          </button>

          <button
            onClick={() => {
              soundFx.playPop();
              setActiveTab('kunci');
            }}
            className={`px-4 py-2.5 rounded-t-2xl font-bold text-sm flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'kunci'
                ? 'bg-white text-amber-900 border-t-2 border-x-2 border-amber-300 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-amber-100/50'
            }`}
          >
            <Key className="w-4 h-4 text-amber-600" />
            <span>Kunci Jawaban Resmi</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 p-6 overflow-y-auto bg-white text-slate-700">
          {/* TAB 1: PANDUAN */}
          {activeTab === 'panduan' && (
            <div className="space-y-6">
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <h3 className="font-bold text-amber-900 text-base">Prinsip Emas Belajar Membaca Usia Dini</h3>
                  <p className="text-sm text-amber-800 mt-1">
                    Anak usia 4–7 tahun belajar paling efektif melalui rasa gembira, visual menyenangkan, dan repetisi tanpa paksaan. Jadikan worksheet ini sebagai petualangan bermain bersama Kiko si Kelinci!
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wide">
                  8 Panduan Pendampingan untuk Orang Tua / Guru:
                </h4>
                <ol className="space-y-3 text-sm">
                  {[
                    'Dampingi anak 10–15 menit setiap sesi. Durasi singkat namun konsisten jauh lebih efektif daripada belajar berjam-jam yang melelahkan.',
                    'Jangan memaksa anak ketika mulai lelah atau jenuh. Beri jeda istirahat dan ajak minum atau bergerak.',
                    'Berikan pujian tulus atas usaha anak, bukan hanya saat anak menjawab dengan sempurna.',
                    'Ulangi level yang belum dikuasai dengan santai sebelum melanjutkan ke materi berikutnya.',
                    'Jangan membandingkan kemampuan membaca anak dengan anak lain. Setiap anak memiliki ritme emasnya masing-masing.',
                    'Gunakan worksheet sebagai aktivitas bermain peran petualangan, bukan sebagai ujian berat.',
                    'Bacakan contoh suara dan artikulasi terlebih dahulu jika anak masih merasa kesulitan atau ragu.',
                    'Berikan reward sederhana (stiker, pelukan hangat, atau tepuk tangan) setelah anak menyelesaikan sebuah misi.',
                  ].map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-3 bg-slate-50 rounded-xl p-3 border border-slate-100">
                      <span className="w-6 h-6 rounded-full bg-amber-500 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-slate-700 leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={onPrintAll}
                  className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm flex items-center gap-2 shadow-sm transition-transform active:scale-95 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Cetak Seluruh Worksheet (60 Halaman A4)</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: TABEL PERKEMBANGAN */}
          {activeTab === 'tabel' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-slate-800 text-lg mb-1">Tabel Pemantauan Perkembangan Anak</h3>
                <p className="text-sm text-slate-500 mb-4">
                  Beri tanda centang sesuai pencapaian anak saat ini. Data tersimpan otomatis di peramban ini.
                </p>

                <div className="overflow-x-auto border border-amber-200 rounded-2xl">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-amber-100/70 text-amber-950 font-bold border-b border-amber-200">
                      <tr>
                        <th className="py-3 px-4">Kemampuan Membaca</th>
                        <th className="py-3 px-3 text-center w-28">Belum</th>
                        <th className="py-3 px-3 text-center w-28">Mulai Bisa</th>
                        <th className="py-3 px-3 text-center w-28">Sudah Bisa</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-amber-100">
                      {[
                        { key: 'mengenalHuruf', label: '1. Mengenal Huruf (A–Z kapital & kecil)' },
                        { key: 'mengenalBunyi', label: '2. Mengenal Bunyi (Fonik huruf awal)' },
                        { key: 'membacaSukuKata', label: '3. Membaca Suku Kata (Konsonan + Vokal)' },
                        { key: 'membacaKata', label: '4. Membaca Kata (2 suku kata bermakna)' },
                        { key: 'membacaKalimat', label: '5. Membaca Kalimat (2–3 kata sederhana)' },
                        { key: 'membacaCerita', label: '6. Membaca Cerita Pendek (pemahaman)' },
                      ].map(({ key, label }) => {
                        const current = assessment[key as keyof Omit<ProgressAssessment, 'notes'>];
                        return (
                          <tr key={key} className="hover:bg-amber-50/50">
                            <td className="py-3.5 px-4 font-semibold text-slate-800">{label}</td>
                            <td className="py-3.5 px-3 text-center">
                              <button
                                onClick={() =>
                                  handleLevelChange(key as keyof Omit<ProgressAssessment, 'notes'>, 'belum')
                                }
                                className={`w-8 h-8 rounded-full border-2 transition-all cursor-pointer ${
                                  current === 'belum'
                                    ? 'bg-rose-500 border-rose-600 text-white shadow-sm scale-110'
                                    : 'border-slate-300 hover:border-slate-400 bg-white text-transparent'
                                }`}
                              >
                                ✓
                              </button>
                            </td>
                            <td className="py-3.5 px-3 text-center">
                              <button
                                onClick={() =>
                                  handleLevelChange(key as keyof Omit<ProgressAssessment, 'notes'>, 'mulai')
                                }
                                className={`w-8 h-8 rounded-full border-2 transition-all cursor-pointer ${
                                  current === 'mulai'
                                    ? 'bg-amber-500 border-amber-600 text-white shadow-sm scale-110'
                                    : 'border-slate-300 hover:border-slate-400 bg-white text-transparent'
                                }`}
                              >
                                ✓
                              </button>
                            </td>
                            <td className="py-3.5 px-3 text-center">
                              <button
                                onClick={() =>
                                  handleLevelChange(key as keyof Omit<ProgressAssessment, 'notes'>, 'bisa')
                                }
                                className={`w-8 h-8 rounded-full border-2 transition-all cursor-pointer ${
                                  current === 'bisa'
                                    ? 'bg-emerald-500 border-emerald-600 text-white shadow-sm scale-110'
                                    : 'border-slate-300 hover:border-slate-400 bg-white text-transparent'
                                }`}
                              >
                                ✓
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Catatan Khusus Guru / Orang Tua */}
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-1">
                  Catatan Refleksi & Kemajuan Anak:
                </label>
                <textarea
                  rows={3}
                  value={assessment.notes}
                  onChange={(e) => onUpdateAssessment({ ...assessment, notes: e.target.value })}
                  placeholder="Contoh: Ananda sudah sangat lancar melafalkan suku kata BA-BI-BU, masih perlu pengulangan pada huruf b dan d..."
                  className="w-full border-2 border-amber-200 rounded-2xl p-3 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          )}

          {/* TAB 3: KUNCI JAWABAN */}
          {activeTab === 'kunci' && (
            <div>
              {!unlockedKey ? (
                <div className="text-center py-10 max-w-sm mx-auto space-y-4">
                  <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto text-2xl">
                    <Lock className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">Verifikasi Pendamping Dewasa</h3>
                  <p className="text-sm text-slate-500">
                    Untuk menjaga kejujuran dan rasa ingin tahu anak, kunci jawaban ini diproteksi.
                  </p>
                  <form onSubmit={handleUnlockPin} className="space-y-3 pt-2">
                    <div className="text-sm font-semibold text-slate-700">
                      Berapakah hasil dari <span className="text-amber-600 font-bold">2 + 3</span>?
                    </div>
                    <input
                      type="text"
                      value={pinInput}
                      onChange={(e) => setPinInput(e.target.value)}
                      placeholder="Ketik angka hasil..."
                      className="w-32 mx-auto text-center border-2 border-amber-300 rounded-xl py-2 px-3 font-bold text-lg focus:outline-none focus:border-amber-500"
                      autoFocus
                    />
                    {pinError && <p className="text-xs text-red-600 font-bold">Jawaban belum tepat, coba lagi ya!</p>}
                    <div>
                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-sm transition-transform active:scale-95 cursor-pointer"
                      >
                        Buka Kunci Jawaban
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-amber-200">
                    <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                      <Key className="w-4 h-4 text-amber-600" />
                      Kunci Jawaban Ringkas Seluruh Aktivitas
                    </h3>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full">
                      Terbuka untuk Guru & Ortu
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[55vh] overflow-y-auto pr-1">
                    {answerPages.map((page) => (
                      <div
                        key={page.pageNumber}
                        className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between font-bold text-amber-900">
                          <span>
                            {page.levelIcon} Hal. {page.pageNumber}: {page.title}
                          </span>
                          <span className="text-[10px] text-slate-500 uppercase">{page.levelTitle}</span>
                        </div>
                        <p className="text-slate-700 font-medium leading-relaxed">
                          💡 <span className="font-bold text-slate-900">Kunci:</span> {page.answerKey}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={() => {
              soundFx.playPop();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-sm transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
