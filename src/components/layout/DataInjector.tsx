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
export function DataInjector({ data, children }: DataInjectorProps) {
  if (!data) return <>{children}</>;

  const injectPropsRecursively = (
    node: React.ReactNode,
    currentScope: ScopeType = 'section'
  ): React.ReactNode => {
    return React.Children.map(node, (child) => {
      if (!React.isValidElement(child)) {
        return child;
      }

      const componentName = getComponentName(child.type);
      const childProps = child.props as Record<string, unknown>;
      const newProps: Record<string, unknown> = {};
      let nextScope: ScopeType = currentScope;

      // 1. SCOPE SECTION
      if (
        componentName === 'PageSection' ||
        componentName === 'CustomContainer' ||
        componentName === 'SectionStack'
      ) {
        nextScope = 'section';
        if (childProps.config === undefined && data.section) {
          newProps.config = data.section;
        }
      } else if (componentName === 'SectionHeader') {
        if (childProps.config === undefined && data.section?.header) {
          newProps.config = data.section.header;
        }
      }

      // 2. SCOPE CONTENT
      else if (componentName === 'ContentStack') {
        nextScope = 'content';
        if (childProps.config === undefined && data.content) {
          newProps.config = data.content;
        }
      } else if (componentName === 'ContentHeader') {
        if (childProps.config === undefined && data.content?.header) {
          newProps.config = data.content.header;
        }
      }

      // 3. SCOPE DETAIL
      else if (componentName === 'DetailStack') {
        nextScope = 'detail';
        if (childProps.config === undefined && data.detail) {
          newProps.config = data.detail;
        }
      } else if (componentName === 'DetailHeader') {
        if (childProps.config === undefined && data.detail?.header) {
          newProps.config = data.detail.header;
        }
      }

      // 4. SCOPE CARD
      else if (componentName === 'CardStack') {
        nextScope = 'card';
        if (childProps.config === undefined && data.card) {
          newProps.config = data.card;
        }
      } else if (componentName === 'CardHeader') {
        if (childProps.config === undefined && data.card?.header) {
          newProps.config = data.card.header;
        }
      }

      // 5. IMAGE CONTAINER (Mengambil image dari scope yang sedang aktif)
      if (componentName === 'ImageContainer') {
        if (childProps.config === undefined) {
          const scopePayload = getScopePayload(data, nextScope) || data.section;
          if (scopePayload?.image) {
            newProps.config = scopePayload.image;
          }
        }
      }

      // Rekursif proses anak dengan scope yang ter-update
      if (child.props && typeof child.props === 'object' && 'children' in child.props) {
        newProps.children = injectPropsRecursively(
          (child.props as { children?: React.ReactNode }).children,
          nextScope
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
