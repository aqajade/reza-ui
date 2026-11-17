'use client';
// src/components/ui/practice/PracticeSessionView.tsx
// Sub-leaf: Sesi Latihan Aktif (Dual Mode, Countdown Timer, 3-Lapis Sanitasi Input)
// Doktrin: rscoClsDdSdDryZaapeiFpSMBip
//   - CLS: 'use client' murni terisolasi di daun interaktif ini.
//   - ZAAPEI: Zero any, Zero as, Zero interface, Zero layout hardcode.
//   - DD: Seluruh teks dikonsumsi dari SSOT `TranslationSchema`.
//   - 1-Viewport Fit: Mode interaktif auto-centering, mode jembreng scroll terisolasi.
//   - Sanitasi: inputMode="numeric", pemblokiran tombol non-numerik, blur onWheel.

import React, { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/layout/button/button';
import { cn } from '@/lib/utils';
import type {
  InteractiveModeOption,
  QuestionItem,
  TimerOption,
  TranslationSchema,
} from '@/types/math/itqan-math';

import { ConfirmModalLeaf } from './ConfirmModalLeaf';

// ==========================================
// Props
// ==========================================

export type PracticeSessionViewProps = {
  t: TranslationSchema;
  interactiveMode: InteractiveModeOption;
  timer: TimerOption;
  questions: QuestionItem[];
  onFinishSession: (finalQuestions: QuestionItem[]) => void;
  onQuitSession: () => void;
};

// ==========================================
// Helper Format Durasi Waktu (MM:SS)
// ==========================================

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

// ==========================================
// Component: PracticeSessionView
// ==========================================

export function PracticeSessionView({
  t,
  interactiveMode,
  timer,
  questions: initialQuestions,
  onFinishSession,
  onQuitSession,
}: PracticeSessionViewProps) {
  // --- State Soal & Jawaban ---
  const [questions, setQuestions] = useState<QuestionItem[]>(initialQuestions);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // --- State Timer ---
  const initialSeconds =
    timer === 'off' ? 0 : parseInt(timer, 10) * 60;
  const [timeLeft, setTimeLeft] = useState<number>(initialSeconds);

  // --- State Modal Konfirmasi Keamanan ---
  const [isQuitModalOpen, setIsQuitModalOpen] = useState<boolean>(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);

  // --- Ref Input untuk AutoFocus pada Mode Interaktif ---
  const singleInputRef = useRef<HTMLInputElement>(null);

  // 1. Sanitasi Input Numerik: Cegah karakter non-angka
  const handleKeyDownNumeric = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Tombol terlarang untuk bilangan cacah / integer positif
    const forbiddenKeys = ['e', 'E', '+', '-', '.', ','];
    if (forbiddenKeys.includes(e.key)) {
      e.preventDefault();
      return;
    }

    // Dukungan Enter untuk navigasi cepat
    if (e.key === 'Enter') {
      e.preventDefault();
      if (interactiveMode === 'interactive') {
        handleInteractiveNext();
      } else {
        setIsSubmitModalOpen(true);
      }
    }
  };

  // 2. Sanitasi Input Numerik: Cegah perubahan nilai akibat scroll wheel
  const handleWheelBlur = (e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
  };

  // 3. Sanitasi Input Nilai: Hanya simpan string digit murni (max 5 digit)
  const handleAnswerChange = (questionId: string, rawVal: string) => {
    const sanitizedVal = rawVal.replace(/\D/g, '').slice(0, 5);
    setQuestions((prev) =>
      prev.map((q) => (q.id === questionId ? { ...q, userAnswer: sanitizedVal } : q))
    );
  };

  // --- Countdown Timer Effect ---
  useEffect(() => {
    if (timer === 'off') return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          // Waktu habis: otomatis selesaikan sesi dan menuju result
          onFinishSession(questions);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, questions, onFinishSession]);

  // --- Auto-focus input saat pindah soal di mode interaktif ---
  useEffect(() => {
    if (interactiveMode === 'interactive') {
      singleInputRef.current?.focus();
    }
  }, [currentIndex, interactiveMode]);

  // --- Handler Interaktif: Next Soal / Konfirmasi Submit ---
  const handleInteractiveNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Soal terakhir di mode interaktif → buka modal konfirmasi submit
      setIsSubmitModalOpen(true);
    }
  };

  // --- Handler Konfirmasi Submit Sesi ---
  const handleConfirmSubmit = () => {
    setIsSubmitModalOpen(false);
    onFinishSession(questions);
  };

  // Current Question untuk Mode Interaktif
  const currentQuestion = questions[currentIndex] ?? questions[0];

  return (
    <div className="flex flex-col gap-3">
      {/* Top Bar: Tombol Quit & Timer Status */}
      <div className="flex items-center justify-between border-b border-gray-800/80 pb-2">
        <button
          type="button"
          onClick={() => setIsQuitModalOpen(true)}
          className="text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-1"
        >
          {t.practice.quitBtn}
        </button>

        {timer !== 'off' && (
          <div
            className={cn(
              'rounded-full px-2.5 py-0.5 text-xs font-mono font-medium transition-colors',
              timeLeft <= 60
                ? 'bg-rose-950/80 border border-rose-800 text-rose-400 animate-pulse'
                : 'bg-gray-800/80 border border-gray-700 text-amber-300'
            )}
          >
            ⏱️ {formatTime(timeLeft)}
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* MODE 1: INTERACTIVE (1-PER-1)                                   */}
      {/* ============================================================== */}
      {interactiveMode === 'interactive' && (
        <div className="flex flex-col items-center justify-center py-2">
          {/* Progress Indikator */}
          <div className="text-xs font-medium text-gray-400 mb-2">
            {t.practice.qProgress} <span className="text-white font-bold">{currentIndex + 1}</span> {t.practice.ofProgress}{' '}
            <span className="text-gray-300">{questions.length}</span>
          </div>

          {/* Card Soal Utama */}
          <div className="w-full max-w-xs rounded-2xl border border-gray-800 bg-gray-900/60 p-4 text-center shadow-lg backdrop-blur-xs flex flex-col items-center">
            {/* Tampilan Ekspresi Aritmatika */}
            <div className="font-mono text-2xl font-bold tracking-wider text-white sm:text-3xl my-2">
              {currentQuestion.num1.toLocaleString()}{' '}
              <span className="text-indigo-400">{currentQuestion.operator}</span>{' '}
              {currentQuestion.num2.toLocaleString()}
            </div>

            {/* Input Jawaban dengan 3 Lapis Sanitasi */}
            <div className="w-full mt-3">
              <input
                ref={singleInputRef}
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                value={currentQuestion.userAnswer ?? ''}
                onChange={(e) =>
                  handleAnswerChange(currentQuestion.id, e.target.value)
                }
                onKeyDown={handleKeyDownNumeric}
                onWheel={handleWheelBlur}
                placeholder={t.practice.placeholderSingle}
                className="w-full rounded-xl border border-gray-700 bg-gray-950/90 py-2.5 px-3 text-center font-mono text-lg font-semibold text-white placeholder-gray-500 shadow-inner outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* Tombol Aksi: Next / Selesai */}
            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={handleInteractiveNext}
              className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs py-2 h-auto rounded-xl"
            >
              {currentIndex < questions.length - 1
                ? `${t.practice.nextBtn} ➔`
                : t.practice.submitBatchBtn}
            </Button>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODE 2: JEMBRENG (ALL-IN-ONE BATCH)                            */}
      {/* ============================================================== */}
      {interactiveMode === 'jembreng' && (
        <div className="flex flex-col gap-2">
          {/* Header Mode Jembreng */}
          <div className="flex items-center justify-between text-xs text-gray-400 px-1">
            <span className="font-medium text-gray-300">
              {t.practice.jembrengTitle}
            </span>
            <span>
              {questions.length} {t.practice.questionsCount}
            </span>
          </div>

          {/* Daftar Soal Terisolasi Scroll (1-Viewport Safe) */}
          <div className="max-h-[230px] overflow-y-auto space-y-2 pr-1 rounded-xl border border-gray-800/60 bg-gray-950/40 p-2 scrollbar-thin scrollbar-thumb-gray-800">
            {questions.map((q, idx) => (
              <div
                key={q.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-gray-800/80 bg-gray-900/50 px-3 py-1.5"
              >
                <div className="flex items-center gap-2 font-mono text-xs text-white">
                  <span className="w-5 text-gray-500 font-sans text-[11px]">
                    {idx + 1}.
                  </span>
                  <span className="font-medium">
                    {q.num1.toLocaleString()} {q.operator} {q.num2.toLocaleString()}
                  </span>
                  <span className="text-gray-500">=</span>
                </div>

                <input
                  type="number"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={q.userAnswer ?? ''}
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  onKeyDown={handleKeyDownNumeric}
                  onWheel={handleWheelBlur}
                  placeholder="..."
                  className="w-24 rounded-md border border-gray-700 bg-gray-950 py-1 px-2 text-center font-mono text-xs font-semibold text-white placeholder-gray-600 outline-none transition focus:border-indigo-500"
                />
              </div>
            ))}
          </div>

          {/* Tombol Submit Batch */}
          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={() => setIsSubmitModalOpen(true)}
            className="w-full mt-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs py-2 h-auto rounded-xl shadow-md"
          >
            {t.practice.submitBatchBtn}
          </Button>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 1: QUIT CONFIRMATION MODAL                               */}
      {/* ============================================================== */}
      <ConfirmModalLeaf
        isOpen={isQuitModalOpen}
        title={t.quitModal.title}
        description={t.quitModal.description}
        cancelLabel={t.quitModal.noBtn}
        confirmLabel={t.quitModal.yesBtn}
        confirmVariant="danger"
        onCancel={() => setIsQuitModalOpen(false)}
        onConfirm={() => {
          setIsQuitModalOpen(false);
          onQuitSession();
        }}
      />

      {/* ============================================================== */}
      {/* MODAL 2: SUBMIT CONFIRMATION MODAL                             */}
      {/* ============================================================== */}
      <ConfirmModalLeaf
        isOpen={isSubmitModalOpen}
        title={t.submitModal.title}
        description={t.submitModal.description}
        cancelLabel={t.submitModal.noBtn}
        confirmLabel={t.submitModal.yesBtn}
        confirmVariant="primary"
        onCancel={() => setIsSubmitModalOpen(false)}
        onConfirm={handleConfirmSubmit}
      />
    </div>
  );
}

export default PracticeSessionView;
