// src/components/layout/BaseHeader.tsx
import * as React from 'react';

import { parseHighlightText } from '@/lib/text-parser';
import { cn } from '@/lib/utils';
import type { HeaderConfig } from '@/types/layout/base';

export type BaseHeaderProps = React.ComponentProps<'div'> & {
  config?: HeaderConfig;
  variant?: 'section' | 'content' | 'card' | 'detail';
};

export function BaseHeader({
  config,
  variant = 'section',
  className,
  children,
  ...props
}: BaseHeaderProps) {
  if (!config) return null;

  const {
    headerClass,
    title,
    titleId,
    titleClass,
    titleElement = variant === 'section'
      ? 'h2'
      : variant === 'content'
        ? 'h3'
        : 'h4',

    subTitle,
    subTitleId,
    subTitleClass,
    subTitleElement = variant === 'section' ? 'h3' : 'h4',

    description,
    descriptionId,
    descriptionClass,
    descriptionElement = 'p',

    descriptionIntro,
    descriptionIntroId,
    descriptionIntroClass,
    descriptionIntroElement = 'p',

    descriptionOutro,
    descriptionOutroId,
    descriptionOutroClass,
    descriptionOutroElement = 'p',
  } = config;

  const TitleTag = titleElement;
  const SubTitleTag = subTitleElement;
  const DescTag = descriptionElement;
  const DescIntroTag = descriptionIntroElement;
  const DescOutroTag = descriptionOutroElement;

  return (
    <div
      className={cn(
        'base-header flex flex-col',
        `header-variant-${variant}`,
        headerClass,
        className
      )}
      {...props}
    >
      {/* 1. Intro Description (opsional di atas title) */}
      {descriptionIntro && (
        <DescIntroTag
          id={descriptionIntroId}
          className={cn('header-desc-intro', descriptionIntroClass)}
        >
          {parseHighlightText(descriptionIntro)}
        </DescIntroTag>
      )}

      {/* 2. Main Title */}
      {title && (
        <TitleTag
          id={titleId}
          className={cn('header-title whitespace-pre-line', titleClass)}
        >
          {parseHighlightText(title)}
        </TitleTag>
      )}

      {/* 3. Sub Title */}
      {subTitle && (
        <SubTitleTag
          id={subTitleId}
          className={cn('header-subtitle', subTitleClass)}
        >
          {parseHighlightText(subTitle)}
        </SubTitleTag>
      )}

      {/* 4. Description */}
      {description && (
        <DescTag
          id={descriptionId}
          className={cn('header-desc', descriptionClass)}
        >
          {parseHighlightText(description)}
        </DescTag>
      )}

      {/* 5. Outro Description */}
      {descriptionOutro && (
        <DescOutroTag
          id={descriptionOutroId}
          className={cn('header-desc-outro', descriptionOutroClass)}
        >
          {parseHighlightText(descriptionOutro)}
        </DescOutroTag>
      )}

      {children}
    </div>
  );
}
