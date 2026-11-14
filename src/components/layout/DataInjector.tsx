import * as React from 'react';

import type { BaseLayoutConfig, SectionConfig } from '@/types/layout/base';

export type ScopeType = 'section' | 'content' | 'detail' | 'card';

export type ScopeData = {
  section?: SectionConfig | BaseLayoutConfig;
  content?: BaseLayoutConfig;
  detail?: BaseLayoutConfig;
  card?: BaseLayoutConfig;
  [key: string]: unknown;
};

export type DataInjectorProps = {
  data: ScopeData;
  /**
   * Named-slot data untuk komponen section kustom yang hidup di dalam pohon ini.
   * Key = nama fungsi komponen (misal: 'HeaderItqanMath').
   * Value = ScopeData milik komponen itu.
   *
   * DataInjector akan otomatis swap konteks data ke slots[name] saat
   * menemukan komponen bernama tersebut — tanpa props manual di TSX.
   * Ini mempertahankan Zero-Props (ZAAP) lintas section berbeda.
   */
  slots?: Record<string, ScopeData | undefined>;
  children: React.ReactNode;
};

// ============================================================================
// HELPER TERISOLASI (Sesuai Asas ZAA: Zero Any & As)
// Seluruh type narrowing & pemeriksaan runtime diisolasi di fungsi ini
// agar ketidakamanan tipe tidak bocor ke logika utama komponen.
// ============================================================================

function getComponentName(type: unknown): string {
  if (typeof type === 'function') {
    return type.name || '';
  }
  if (typeof type === 'object' && type !== null) {
    const obj = type as { displayName?: string; name?: string };
    return obj.displayName || obj.name || '';
  }
  return '';
}

function getScopePayload(
  data: ScopeData,
  scope: ScopeType
): BaseLayoutConfig | undefined {
  switch (scope) {
    case 'section':
      return data.section;
    case 'content':
      return data.content;
    case 'detail':
      return data.detail;
    case 'card':
      return data.card;
    default:
      return undefined;
  }
}

/**
 * DataInjector
 * 
 * Melakukan Server-Side Recursive Traversal (RSC-friendly) untuk menginjeksi
 * prop `config` secara otomatis ke komponen layout & typography semantik reza-ui.
 * 
 * Mendukung 4 Scope Flexbox Semantik:
 * 1. section  -> PageSection, CustomContainer, SectionStack, SectionHeader, ImageContainer
 * 2. content  -> ContentStack, ContentHeader, ImageContainer
 * 3. detail   -> DetailStack, DetailHeader, ImageContainer
 * 4. card     -> CardStack, CardHeader, ImageContainer
 * 
 * Asas Tertinggi: rscoclsddsddryzaafpsmbip (Zero Any & As)
 */
export function DataInjector({ data, slots, children }: DataInjectorProps) {
  if (!data) return <>{children}</>;

  const injectPropsRecursively = (
    node: React.ReactNode,
    currentScope: ScopeType = 'section',
    currentData: ScopeData = data
  ): React.ReactNode => {
    return React.Children.map(node, (child) => {
      if (!React.isValidElement(child)) {
        return child;
      }

      const componentName = getComponentName(child.type);
      const childProps = child.props as Record<string, unknown>;
      const newProps: Record<string, unknown> = {};
      let nextScope: ScopeType = currentScope;

      // 0. NAMED SLOT — swap data konteks untuk komponen section kustom
      // Jika komponen ini terdaftar di `slots`, ekspansi fungsi komponennya
      // dan jalankan injeksi props rekursif ke seluruh pohon JSX di dalamnya
      // menggunakan data milik slot tersebut (scope di-reset ke 'section').
      if (slots && componentName in slots) {
        const slotData = slots[componentName];
        if (slotData !== undefined && typeof child.type === 'function') {
          const renderedSubtree = (child.type as (props: unknown) => React.ReactNode)(child.props);
          return injectPropsRecursively(renderedSubtree, 'section', slotData);
        }
      }

      // 1. SCOPE SECTION
      if (
        componentName === 'PageSection' ||
        componentName === 'CustomContainer' ||
        componentName === 'SectionStack'
      ) {
        nextScope = 'section';
        if (childProps.config === undefined && currentData.section) {
          newProps.config = currentData.section;
        }
      } else if (componentName === 'SectionHeader' || componentName === 'SectionBadge') {
        if (childProps.config === undefined && currentData.section?.header) {
          newProps.config = currentData.section.header;
        }
      }

      // 2. SCOPE CONTENT
      else if (componentName === 'ContentStack') {
        nextScope = 'content';
        if (childProps.config === undefined && currentData.content) {
          newProps.config = currentData.content;
        }
      } else if (componentName === 'ContentHeader' || componentName === 'ContentBadge') {
        if (childProps.config === undefined && currentData.content?.header) {
          newProps.config = currentData.content.header;
        }
      }

      // 3. SCOPE DETAIL
      else if (componentName === 'DetailStack') {
        nextScope = 'detail';
        if (childProps.config === undefined && currentData.detail) {
          newProps.config = currentData.detail;
        }
      } else if (componentName === 'DetailHeader' || componentName === 'DetailBadge') {
        if (childProps.config === undefined && currentData.detail?.header) {
          newProps.config = currentData.detail.header;
        }
      }

      // 4. SCOPE CARD
      else if (componentName === 'CardStack') {
        nextScope = 'card';
        if (childProps.config === undefined && currentData.card) {
          newProps.config = currentData.card;
        }
      } else if (componentName === 'CardHeader' || componentName === 'CardBadge') {
        if (childProps.config === undefined && currentData.card?.header) {
          newProps.config = currentData.card.header;
        }
      }

      // 5. IMAGE CONTAINER (Mengambil image dari scope yang sedang aktif)
      if (componentName === 'ImageContainer') {
        if (childProps.config === undefined) {
          const scopePayload = getScopePayload(currentData, nextScope) || currentData.section;
          if (scopePayload?.image) {
            newProps.config = scopePayload.image;
          }
        }
      }

      // 6. BASE BADGE / LEGACY BADGE (Fallback mengambil header dari active scope)
      if (componentName === 'BaseBadge' || componentName === 'Badge') {
        if (childProps.config === undefined) {
          const scopePayload = getScopePayload(currentData, nextScope) || currentData.section;
          if (scopePayload?.header) {
            newProps.config = scopePayload.header;
          }
        }
      }

      // Rekursif proses anak dengan scope dan data yang ter-update
      if (child.props && typeof child.props === 'object' && 'children' in child.props) {
        newProps.children = injectPropsRecursively(
          (child.props as { children?: React.ReactNode }).children,
          nextScope,
          currentData
        );
      }

      // Jika ada props yang disuntikkan, clone elemen
      if (Object.keys(newProps).length > 0) {
        return React.cloneElement(child, newProps);
      }

      return child;
    });
  };

  return <>{injectPropsRecursively(children, 'section')}</>;
}
