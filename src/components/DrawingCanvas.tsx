import React, { useRef, useState, useEffect } from 'react';
import { RotateCcw, Paintbrush, Eraser, Check } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface DrawingCanvasProps {
  height?: number;
  watermarkText?: string;
  guideLines?: boolean;
  onDrawEnd?: () => void;
}

const COLORS = [
  { name: 'Biru', value: '#2563eb', bg: 'bg-blue-600' },
  { name: 'Merah', value: '#dc2626', bg: 'bg-red-600' },
  { name: 'Hijau', value: '#16a34a', bg: 'bg-green-600' },
  { name: 'Ungu', value: '#9333ea', bg: 'bg-purple-600' },
  { name: 'Kuning Emas', value: '#d97706', bg: 'bg-amber-600' },
];

export const DrawingCanvas: React.FC<DrawingCanvasProps> = ({
  height = 160,
  watermarkText,
  guideLines = true,
  onDrawEnd,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState(COLORS[0].value);
  const [isEraser, setIsEraser] = useState(false);
  const [strokeWidth, setStrokeWidth] = useState(6);
  const [hasDrawn, setHasDrawn] = useState(false);

  // Set up canvas sizing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const rect = parent.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
  }, [height]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    setHasDrawn(true);
    soundFx.playPop();

    const rect = canvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = isEraser ? '#ffffff' : color;
    ctx.lineWidth = isEraser ? strokeWidth * 2.5 : strokeWidth;
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      if (onDrawEnd) onDrawEnd();
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
    soundFx.playPop();
  };

  return (
    <div className="w-full bg-white rounded-2xl border-2 border-dashed border-amber-300 p-2 sm:p-3 shadow-inner relative flex flex-col items-center">
      {/* Tools Toolbar */}
      <div className="w-full flex items-center justify-between pb-2 mb-1 border-b border-amber-100 flex-wrap gap-2 text-xs">
        {/* Colors Palette */}
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-slate-500 mr-1 hidden sm:inline">Warna:</span>
          {COLORS.map((c) => (
            <button
              key={c.value}
              onClick={() => {
                setColor(c.value);
                setIsEraser(false);
                soundFx.playPop();
              }}
              className={`w-6 h-6 rounded-full ${c.bg} transition-transform ${
                !isEraser && color === c.value
                  ? 'ring-2 ring-offset-2 ring-slate-700 scale-110'
                  : 'hover:scale-105 opacity-85'
              }`}
              title={c.name}
            />
          ))}
        </div>

        {/* Brush vs Eraser & Clear */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsEraser(false);
              soundFx.playPop();
            }}
            className={`px-2 py-1 rounded-lg flex items-center gap-1 font-bold ${
              !isEraser
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Paintbrush className="w-3.5 h-3.5" />
            <span>Kuas</span>
          </button>

          <button
            onClick={() => {
              setIsEraser(true);
              soundFx.playPop();
            }}
            className={`px-2 py-1 rounded-lg flex items-center gap-1 font-bold ${
              isEraser
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Eraser className="w-3.5 h-3.5" />
            <span>Penghapus</span>
          </button>

          <button
            onClick={clearCanvas}
            className="px-2 py-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 flex items-center gap-1 font-bold transition-colors"
            title="Hapus Coretan"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Bersihkan</span>
          </button>
        </div>
      </div>

      {/* Drawing Area Container with Optional Dotted Letter Watermark */}
      <div
        className="w-full relative rounded-xl overflow-hidden touch-none cursor-crosshair bg-amber-50/20"
        style={{ height }}
      >
        {/* Handwriting guidelines (buku halus kasar 3 garis) */}
        {guideLines && (
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-around py-3 opacity-30">
            <div className="border-b-2 border-blue-400 w-full" />
            <div className="border-b-2 border-dashed border-slate-400 w-full" />
            <div className="border-b-2 border-blue-400 w-full" />
          </div>
        )}

        {/* Watermark dotted guide letters for tracing practice */}
        {watermarkText && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center select-none">
            <span className="text-6xl sm:text-7xl font-bold tracking-widest text-slate-300 font-sans border-b-2 border-transparent">
              {watermarkText}
            </span>
          </div>
        )}

        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="relative z-10 w-full h-full"
        />
      </div>

      {/* Helpful small tip */}
      <div className="w-full flex items-center justify-between text-[11px] text-slate-500 font-medium mt-1 px-1">
        <span>✏️ Gunakan jari atau mouse untuk menebalkan / menulis</span>
        {hasDrawn && (
          <span className="text-emerald-600 font-bold flex items-center gap-0.5">
            <Check className="w-3 h-3" /> Sudah dicoret!
          </span>
        )}
      </div>
    </div>
  );
};
