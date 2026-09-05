import React from 'react';
import { worksheetPages } from '../data/worksheetData';
import { StudentProfile } from '../types';

interface PrintableWorksheetProps {
  profile: StudentProfile;
}

export const PrintableWorksheet: React.FC<PrintableWorksheetProps> = ({ profile }) => {
  return (
    <div className="hidden print:block w-full">
      {worksheetPages.map((page) => (
        <div
          key={page.pageNumber}
          className="print-page print-page-break p-8 flex flex-col justify-between border-2 border-slate-300 bg-white"
          style={{ minHeight: '275mm', boxSizing: 'border-box' }}
        >
          {/* Header of each printed page */}
          <div className="border-b-2 border-amber-400 pb-3 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
                {page.levelTitle}
              </span>
              <h2 className="text-xl font-bold font-heading text-slate-900">
                {page.title}
              </h2>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-slate-500 block">
                Nama: {profile.name || '________________'}
              </span>
              <span className="text-xs font-extrabold text-amber-600">
                Halaman {page.pageNumber} / 60
              </span>
            </div>
          </div>

          {/* Instruction & Kiko Speech */}
          <div className="my-3 p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs">
            <p className="font-bold text-slate-800">
              📌 <span className="underline">Petunjuk:</span> {page.instruction}
            </p>
            <p className="text-amber-800 italic mt-1 font-medium">
              🐰 Kiko: “{page.kikoMessage}”
            </p>
          </div>

          {/* Main Printable Content Area */}
          <div className="flex-1 flex flex-col justify-center my-2 space-y-4">
            {/* If Cover */}
            {page.activityType === 'cover' && (
              <div className="text-center space-y-4 py-8">
                <span className="text-6xl block">🌈🐰📚</span>
                <h1 className="text-3xl font-extrabold text-slate-900">
                  PETUALANGAN JADI PEMBACA HEBAT
                </h1>
                <p className="text-base font-bold text-slate-700">
                  Belajar Huruf, Bunyi, Suku Kata, Kata, Kalimat, dan Cerita Sambil Bermain!
                </p>
                <div className="border-2 border-dashed border-amber-400 rounded-2xl p-6 max-w-sm mx-auto mt-6">
                  <p className="text-sm font-bold text-slate-600">Buku Milik:</p>
                  <p className="text-2xl font-bold text-amber-900 mt-2">
                    {profile.name || '__________________________'}
                  </p>
                </div>
              </div>
            )}

            {/* If Profile */}
            {page.activityType === 'profile' && (
              <div className="max-w-md mx-auto w-full border-2 border-slate-300 rounded-2xl p-6 space-y-4">
                <div className="text-center font-bold text-lg text-slate-800">INI BUKUKU</div>
                <div className="space-y-3 text-sm">
                  <div>Nama Lengkap: ___________________________________</div>
                  <div>Usia: __________________________________________</div>
                  <div>Tanggal Mulai: ___________________________________</div>
                </div>
                <div className="h-32 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center text-xs text-slate-400">
                  Tempel Foto / Gambar Wajahmu di Sini
                </div>
              </div>
            )}

            {/* If Letter Trace or Circle */}
            {(page.activityType === 'letter-trace' || page.activityType === 'letter-circle') && (
              <div className="space-y-6 text-center">
                {page.data.capital && (
                  <div className="flex items-center justify-center gap-6 p-4 border border-slate-200 rounded-2xl">
                    <span className="text-6xl font-bold font-sans text-slate-900">
                      {page.data.capital} {page.data.small}
                    </span>
                    <span className="text-5xl">{page.data.emoji}</span>
                    <span className="text-2xl font-bold text-slate-800">{page.data.word}</span>
                  </div>
                )}

                {/* Tracing lines guide for print */}
                <div className="space-y-3 text-left">
                  <span className="text-xs font-bold text-slate-500">Tebalkan garis huruf berikut:</span>
                  <div className="p-4 border-2 border-slate-300 rounded-xl dashed-handwriting-guide h-28 flex items-center justify-around text-4xl font-sans text-slate-400">
                    <span>{page.data.capital}</span>
                    <span>{page.data.small}</span>
                    <span>{page.data.capital}</span>
                    <span>{page.data.small}</span>
                    <span>{page.data.capital}</span>
                  </div>
                </div>

                {page.data.grid && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-500">Lingkari huruf target:</span>
                    <div className="grid grid-cols-4 gap-3 max-w-sm mx-auto">
                      {page.data.grid.map((it: any) => (
                        <div key={it.id} className="h-14 border-2 border-slate-400 rounded-full flex items-center justify-center text-2xl font-bold">
                          {it.char}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* If Syllable / Word */}
            {(page.activityType === 'syllable-learn' || page.activityType === 'word-read') && (
              <div className="space-y-6">
                {page.data.syllables && (
                  <div className="grid grid-cols-5 gap-2">
                    {page.data.syllables.map((s: any) => (
                      <div key={s.syl} className="p-3 border-2 border-slate-300 rounded-xl text-center">
                        <span className="text-2xl font-bold block">{s.syl}</span>
                        <span className="text-[10px] text-slate-500">{s.example}</span>
                      </div>
                    ))}
                  </div>
                )}

                {page.data.words && (
                  <div className="grid grid-cols-2 gap-4">
                    {page.data.words.map((w: any) => (
                      <div key={w.word} className="p-4 border-2 border-slate-300 rounded-xl text-center space-y-1">
                        <span className="text-3xl block">{w.emoji}</span>
                        <span className="text-2xl font-bold tracking-wide">
                          {w.s1} - {w.s2}
                        </span>
                        <span className="text-sm text-slate-500 block">({w.word})</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-500">Tulis ulang dengan rapi:</span>
                  <div className="dashed-handwriting-guide border-2 border-slate-300 rounded-xl h-24" />
                </div>
              </div>
            )}

            {/* If Sentence */}
            {page.activityType === 'sentence-read' && (
              <div className="space-y-6 text-center py-6">
                <span className="text-6xl block">{page.data.emoji}</span>
                <div className="p-6 border-2 border-slate-400 rounded-2xl bg-slate-50">
                  <h3 className="text-3xl font-extrabold text-slate-900 tracking-wide">
                    {page.data.sentence}
                  </h3>
                </div>
                <div className="text-left space-y-2">
                  <span className="text-xs font-bold text-slate-500">Tulis kembali kalimat di atas:</span>
                  <div className="dashed-handwriting-guide border-2 border-slate-300 rounded-xl h-24" />
                </div>
              </div>
            )}

            {/* If Story */}
            {page.activityType === 'story-quiz' && (
              <div className="space-y-6">
                <div className="p-5 border-2 border-slate-300 rounded-2xl bg-slate-50 text-center space-y-2">
                  <h4 className="font-bold text-lg">{page.data.storyTitle}</h4>
                  {page.data.paragraphs.map((p: string, i: number) => (
                    <p key={i} className="text-xl font-bold text-slate-800">{p}</p>
                  ))}
                </div>

                <div className="space-y-3">
                  <h5 className="font-bold text-xs uppercase text-slate-500">Pertanyaan:</h5>
                  {page.data.questions.map((q: any) => (
                    <div key={q.id} className="text-sm space-y-1">
                      <p className="font-bold">{q.question}</p>
                      <div className="flex gap-4">
                        {q.options.map((opt: string) => (
                          <span key={opt} className="px-3 py-1 border border-slate-400 rounded-lg">
                            ☐ {opt}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* If Reward / Medal / Certificate */}
            {(page.activityType === 'reward' || page.activityType === 'party') && (
              <div className="text-center space-y-4 py-8 border-2 border-dashed border-amber-300 rounded-2xl">
                <span className="text-6xl block">🏅</span>
                <h3 className="text-2xl font-bold text-slate-900">{page.title}</h3>
                <p className="text-sm text-slate-600">{page.kikoMessage}</p>
                <div className="flex justify-center gap-2 text-2xl pt-2">
                  ⭐⭐⭐⭐⭐
                </div>
              </div>
            )}

            {page.activityType === 'certificate' && (
              <div className="border-4 border-double border-amber-600 p-8 rounded-2xl text-center space-y-4">
                <h2 className="text-2xl font-extrabold">🏆 SERTIFIKAT PEMBACA HEBAT 🏆</h2>
                <p className="text-xs text-slate-600">Diberikan kepada:</p>
                <p className="text-3xl font-extrabold text-amber-900 underline">
                  {profile.name || '__________________________'}
                </p>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Karena telah berhasil menyelesaikan seluruh rangkaian materi & misi pada worksheet:
                  “PETUALANGAN JADI PEMBACA HEBAT”
                </p>
                <div className="flex justify-between text-xs pt-8">
                  <div>Tanggal: ____________</div>
                  <div>Orang Tua / Guru: ____________</div>
                </div>
              </div>
            )}
          </div>

          {/* Footer of each printed page */}
          <div className="border-t border-slate-200 pt-2 flex items-center justify-between text-[10px] text-slate-400">
            <span>Petualangan Jadi Pembaca Hebat — Worksheet Anak Usia 4–7 Tahun</span>
            <span>Halaman {page.pageNumber}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
