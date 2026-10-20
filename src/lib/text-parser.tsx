
// src/lib/text-parser.tsx
import * as React from 'react';

import { cn } from '@/lib/utils';

interface ParseHighlightOptions {
  defaultHighlightClass?: string;
}

export function parseHighlightText(
  text: string,
  options: ParseHighlightOptions = {}
): React.ReactNode {
  const { defaultHighlightClass = 'font-extrabold' } = options;

  if (!text || !text.includes('[')) {
    return text;
  }

  // Regex menangkap [teks] DAN opsional (class)
  const regex = /\[([^\]]+)\](?:\(([^)]+)\))?/g;
  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    const [fullMatch, cleanText, customClass] = match;
    const matchIndex = match.index;

    // Teks biasa sebelum kurung siku
    if (matchIndex > lastIndex) {
      elements.push(text.slice(lastIndex, matchIndex));
    }

    // Teks yang di-highlight
    elements.push(
      <span
        key={matchIndex}
        className={cn(customClass || defaultHighlightClass)}
      >
        {cleanText}
      </span>
    );

    lastIndex = matchIndex + fullMatch.length;
  }

  // Teks biasa setelah kurung terakhir sampai habis
  if (lastIndex < text.length) {
    elements.push(text.slice(lastIndex));
  }

  return elements;
}
