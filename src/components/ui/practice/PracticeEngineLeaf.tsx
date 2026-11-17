'use client';
// src/components/ui/practice/PracticeEngineLeaf.tsx
// Core Client Leaf — Lifecycle Controller ItqanMath
// Doktrin: rscoClsDdSdDryZaapeiFpSMbBip
//   - CLS: 'use client' murni terisolasi di daun interaktif ini.
//   - ZAAPEI: Zero interface, zero any/as, zero layout hardcode.
//   - DD: Semua data dari SSOT (itqanDictionary, itqanModules, itqanDefaultCombinations).

import { useState } from 'react';

import { itqanDictionary } from '@/data/itqan-math/dictionary';
import { itqanDefaultCombinations } from '@/data/itqan-math/digits';
import { itqanModules } from '@/data/itqan-math/modules';
import type {
  AppState,
  DigitConfig,
  Language,
  ModuleId,
  QuizConfig,
} from '@/types/math/itqan-math';

import { DigitModalLeaf } from './DigitModalLeaf';
import { HomeMenuView } from './HomeMenuView';
import { ModuleSetupView } from './ModuleSetupView';

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
  // --- Lifecycle State ---
  const [appState, setAppState] = useState<AppState>('home-menu');

  // --- Module State ---
  const [activeModuleId, setActiveModuleId] = useState<ModuleId>('addition');

  // --- Language State ---
  const [language] = useState<Language>(initialLanguage);

  // --- Quiz Config State ---
  const [config, setConfig] = useState<QuizConfig>(DEFAULT_QUIZ_CONFIG);

  // --- Digit Modal State ---
  const [isDigitModalOpen, setIsDigitModalOpen] = useState<boolean>(false);

  // --- Derived: active translation + active module ---
  const t = itqanDictionary[language];
  const activeModule =
    itqanModules.find((m) => m.id === activeModuleId) ?? itqanModules[0];

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

  // Handler: Mulai Latihan (Placeholder Step 1.5)
  const handleStartPractice = () => {
    // Akan diaktifkan pada Step 1.5 (Sesi Latihan / Practicing)
    setAppState('practicing');
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
          modules={itqanModules}
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

      {/* STATE 3: PRACTICING (Step 1.5 Placeholder) */}
      {appState === 'practicing' && (
        <div className='py-8 text-center text-xs text-gray-400'>
          Practicing Session (Step 1.5)
        </div>
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
