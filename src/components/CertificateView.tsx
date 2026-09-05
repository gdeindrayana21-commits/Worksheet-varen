import React, { useState } from 'react';
import { Award, Printer, Sparkles, CheckCircle2, Heart } from 'lucide-react';
import { StudentProfile } from '../types';
import { soundFx } from '../utils/audio';

interface CertificateViewProps {
  profile: StudentProfile;
  onUpdateProfile: (profile: StudentProfile) => void;
  onPrint: () => void;
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  profile,
  onUpdateProfile,
  onPrint,
}) => {
  const [teacherName, setTeacherName] = useState('Orang Tua / Guru Hebat');
  const [dateStr, setDateStr] = useState(
    profile.date || new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  );

  return (
    <div className="w-full flex flex-col items-center">
      {/* Certificate Frame with A4 Aspect Ratio */}
      <div className="w-full max-w-2xl bg-gradient-to-b from-amber-50 via-white to-amber-50/60 border-8 border-double border-amber-500 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden print:border-8 print:border-amber-600 print:shadow-none print:w-full print:m-0">
        {/* Decorative corner flourishes */}
        <div className="absolute top-2 left-2 text-amber-400 text-2xl select-none">✨</div>
        <div className="absolute top-2 right-2 text-amber-400 text-2xl select-none">⭐</div>
        <div className="absolute bottom-2 left-2 text-amber-400 text-2xl select-none">🌈</div>
        <div className="absolute bottom-2 right-2 text-amber-400 text-2xl select-none">🏆</div>

        {/* Certificate Header */}
        <div className="text-center space-y-1 sm:space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-1">
            <Award className="w-4 h-4 text-amber-600" />
            Penghargaan Resmi Membaca
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-amber-900 tracking-tight">
            🏆 SERTIFIKAT PEMBACA HEBAT 🏆
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-500">
            Diberikan dengan penuh kebanggaan kepada:
          </p>
        </div>

        {/* Student Name */}
        <div className="my-6 text-center">
          <div className="inline-block relative">
            <input
              type="text"
              value={profile.name || ''}
              onChange={(e) => onUpdateProfile({ ...profile, name: e.target.value })}
              placeholder="Ketik Nama Anak..."
              className="text-2xl sm:text-4xl font-extrabold font-heading text-amber-800 text-center border-b-2 border-dashed border-amber-400 focus:outline-none focus:border-amber-600 pb-1 w-72 sm:w-96 bg-transparent"
            />
            <div className="text-[11px] text-amber-600/70 font-semibold mt-1">
              (Bisa diketik atau diubah langsung namanya)
            </div>
          </div>
        </div>

        {/* Statement */}
        <div className="text-center max-w-lg mx-auto space-y-2">
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
            Telah menyelesaikan seluruh misi belajar membaca mulai dari mengenal Huruf A–Z, Bunyi Fonik, Suku Kata, Kata, Kalimat, hingga Cerita Pendek pada program:
          </p>
          <div className="p-2.5 rounded-2xl bg-amber-100/80 text-amber-950 font-extrabold text-sm sm:text-base font-heading">
            🌈 “PETUALANGAN JADI PEMBACA HEBAT” 📚✨
          </div>
          <p className="text-xs sm:text-sm text-slate-600 font-semibold italic">
            “Kini aku siap membaca buku-buku hebat di seluruh dunia!”
          </p>
        </div>

        {/* Golden Seal & Signatures */}
        <div className="mt-8 pt-6 border-t border-amber-200 flex items-center justify-between gap-4">
          {/* Date & Location */}
          <div className="text-center w-36 sm:w-44">
            <input
              type="text"
              value={dateStr}
              onChange={(e) => setDateStr(e.target.value)}
              placeholder="Tanggal..."
              className="text-xs sm:text-sm font-bold text-slate-800 text-center border-b border-dashed border-slate-300 pb-0.5 w-full bg-transparent focus:outline-none"
            />
            <span className="text-[10px] text-slate-400 block mt-0.5">Tanggal Kelulusan</span>
          </div>

          {/* Central Gold Medal Badge */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 border-2 border-amber-600 shadow-md flex items-center justify-center text-white text-2xl relative">
              <Award className="w-8 h-8 text-amber-900" />
              <div className="absolute -bottom-2 w-5 h-5 bg-red-600 rounded-sm rotate-45 -z-10" />
            </div>
            <span className="text-[9px] font-black text-amber-900 tracking-wider mt-1 uppercase">
              BINTANG EMAS
            </span>
          </div>

          {/* Teacher / Parent Signature */}
          <div className="text-center w-36 sm:w-44">
            <input
              type="text"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              placeholder="Nama Guru / Ortu..."
              className="text-xs sm:text-sm font-bold text-slate-800 text-center border-b border-dashed border-slate-300 pb-0.5 w-full bg-transparent focus:outline-none"
            />
            <span className="text-[10px] text-slate-400 block mt-0.5">Orang Tua / Guru Pembimbing</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 flex items-center gap-3 no-print">
        <button
          onClick={() => {
            soundFx.playCorrect();
            onPrint();
          }}
          className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm sm:text-base flex items-center gap-2 shadow-md transition-transform active:scale-95 cursor-pointer"
        >
          <Printer className="w-5 h-5" />
          <span>Cetak Sertifikat ini (A4 PDF)</span>
        </button>
      </div>
    </div>
  );
};
