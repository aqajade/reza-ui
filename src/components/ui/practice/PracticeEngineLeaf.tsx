'use client';
// src/components/ui/practice/PracticeEngineLeaf.tsx
// Core Client Leaf — Lifecycle Controller ItqanMath
// Doktrin: rscoClsDdSdDryZaapeiFpSMBip
//   - CLS: 'use client' murni terisolasi di daun interaktif ini.
//   - ZAAPEI: Zero interface, zero any/as, zero layout hardcode.
//   - DD: Semua data dari SSOT (itqanDictionary, itqanModules, itqanDefaultCombinations).

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { itqanDictionary } from '@/data/itqan-math/dictionary';
import { itqanDefaultCombinations } from '@/data/itqan-math/digits';
import { itqanModulesMap } from '@/data/itqan-math/modules';
import { generateAdditionQuestions } from '@/lib/math-engine/addition-generator';
import type {
  AppState,
  DigitConfig,
  Language,
  ModuleId,
  QuestionItem,
  QuizConfig,
} from '@/types/math/itqan-math';

import { DigitModalLeaf } from './DigitModalLeaf';
import { HomeMenuView } from './HomeMenuView';
import { ModuleSetupView } from './ModuleSetupView';
import { PracticeSessionView } from './PracticeSessionView';

// ==========================================
// Props
// ==========================================

export type PracticeEngineLeafProps = {
  initialLanguage?: Language;
};

// ==========================================
// Default Config
// ==========================================

const DEFAULT_QUIZ_CONFIG: QuizConfig = {
  totalQuestions: 10,
  timer: 'off',
  interactiveMode: 'interactive',
  digitConfig: {
    mode: 'preset',
    presetId: 'satuan',
    combinations: itqanDefaultCombinations,
  },
};

// ==========================================
// PracticeEngineLeaf Component
// ==========================================

export function PracticeEngineLeaf({
  initialLanguage = 'en',
}: PracticeEngineLeafProps) {
  const searchParams = useSearchParams();
  const urlLang = searchParams?.get('lang') === 'id' ? 'id' : 'en';

  // --- Lifecycle State ---
  const [appState, setAppState] = useState<AppState>('home-menu');

  // --- Module State ---
  const [activeModuleId, setActiveModuleId] = useState<ModuleId>('addition');

  // --- Language State ---
  const [language, setLanguage] = useState<Language>(
    initialLanguage ?? urlLang
  );

  // Sinkronkan bahasa saat parameter URL berubah
  useEffect(() => {
    if (urlLang) {
      setLanguage(urlLang);
    }
  }, [urlLang]);

  // --- Quiz Config State ---
  const [config, setConfig] = useState<QuizConfig>(DEFAULT_QUIZ_CONFIG);

  // --- Questions State (Generated saat masuk 'practicing') ---
  const [questions, setQuestions] = useState<QuestionItem[]>([]);

  // --- Digit Modal State ---
  const [isDigitModalOpen, setIsDigitModalOpen] = useState<boolean>(false);

  // --- Derived: active translation + active module from multilingual SSOT map ---
  const t = itqanDictionary[language] ?? itqanDictionary.en;
  const currentModules = itqanModulesMap[language] ?? itqanModulesMap.en;
  const activeModule =
    currentModules.find((m) => m.id === activeModuleId) ?? currentModules[0];

  // ==========================================
  // Handlers
  // ==========================================

  const handleSelectModule = (moduleId: ModuleId) => {
    setActiveModuleId(moduleId);
    setAppState('module-setup');
  };

  const handleBackToHome = () => {
    setAppState('home-menu');
  };

  const handleOpenDigitModal = () => {
    setIsDigitModalOpen(true);
  };

  const handleCloseDigitModal = () => {
    setIsDigitModalOpen(false);
  };

  // Handler: Simpan digitConfig baru dari modal — commit ke config utama
  const handleSaveDigitConfig = (newDigitConfig: DigitConfig) => {
    setConfig((prev) => ({ ...prev, digitConfig: newDigitConfig }));
    setIsDigitModalOpen(false);
  };

  // Handler: Mulai Latihan — Generate Soal secara murni programatik & aktifkan practicing
  const handleStartPractice = () => {
    const generated = generateAdditionQuestions(config);
    setQuestions(generated);
    setAppState('practicing');
  };

  // Handler: Selesai Sesi Latihan — Evaluasi Jawaban & beralih ke result
  const handleFinishPractice = (finalQuestions: QuestionItem[]) => {
    const evaluated = finalQuestions.map((q) => {
      const parsedAns = q.userAnswer ? parseInt(q.userAnswer, 10) : NaN;
      return {
        ...q,
        isCorrect: parsedAns === q.correctAnswer,
      };
    });
    setQuestions(evaluated);
    setAppState('result');
  };

  // Handler: Batal Sesi Latihan (Quit) — kembali ke module-setup
  const handleQuitPractice = () => {
    setAppState('module-setup');
  };

  // ==========================================
  // Render
  // ==========================================

  return (
    <div className='relative flex w-full flex-col'>
      {/* STATE 1: HOME MENU */}
      {appState === 'home-menu' && (
        <HomeMenuView
          lang={language}
          t={t}
          modules={currentModules}
          onSelectModule={handleSelectModule}
        />
      )}

      {/* STATE 2: MODULE SETUP */}
      {appState === 'module-setup' && (
        <ModuleSetupView
          lang={language}
          t={t}
          module={activeModule}
          config={config}
          onChangeConfig={setConfig}
          onBackToHome={handleBackToHome}
          onOpenDigitModal={handleOpenDigitModal}
          onStartPractice={handleStartPractice}
        />
      )}

      {/* STATE 3: PRACTICING (Step 1.5 Selesai) */}
      {appState === 'practicing' && (
        <PracticeSessionView
          t={t}
          interactiveMode={config.interactiveMode}
          timer={config.timer}
          questions={questions}
          onFinishSession={handleFinishPractice}
          onQuitSession={handleQuitPractice}
        />
      )}

      {/* STATE 4: RESULT (Step 1.6 Placeholder) */}
      {appState === 'result' && (
        <div className='py-8 text-center text-xs text-gray-400'>
          Result Screen (Step 1.6)
        </div>
      )}

      {/* MODAL: Digit Customization (dipasang di root leaf agar z-index aman) */}
      {isDigitModalOpen && (
        <DigitModalLeaf
          lang={language}
          t={t}
          digitConfig={config.digitConfig}
          onSave={handleSaveDigitConfig}
          onCancel={handleCloseDigitModal}
        />
      )}
    </div>
  );
}

export default PracticeEngineLeaf;
