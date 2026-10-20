import * as React from 'react';

import { parseHighlightText } from '@/lib/text-parser';
import { cn } from '@/lib/utils';
import type { HeaderConfig } from '@/types/layout/page-config';

type SectionHeaderProps = React.ComponentProps<'div'> & {
  config: HeaderConfig;
};

// function renderHighlightedText(text: string) {
//   return text.split(/(\[[^\]]+\])/g).map((part, index) => {
//     if (part.startsWith('[') && part.endsWith(']')) {
//       return (
//         <span key={index} className='font-extrabold text-yellow-500'>
//           {part.slice(1, -1)}
//         </span>
//       );
//     }

//     return part;
//   });
// }

export function SectionHeader({
  config,
  className,
  ...props
}: SectionHeaderProps) {
  const {
    headerClass,

    title,
    titleId,
    titleClass,
    titleElement = 'h2',

    subTitle,
    subTitleId,
    subTitleClass,
    subTitleElement = 'h3',

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

  const TitleElement = titleElement;
  const SubTitleElement = subTitleElement;
  const DescriptionElement = descriptionElement;
  const DescriptionIntroElement = descriptionIntroElement;
  const DescriptionOutroElement = descriptionOutroElement;

  return (
    <div
      className={cn('section-header flex flex-col', headerClass, className)}
      {...props}
    >
      {title != null && title !== '' && (
        <TitleElement
          id={titleId}
          className={cn('section-heading whitespace-pre-line', titleClass)}
        >
          {parseHighlightText(title)}
        </TitleElement>
      )}

      {subTitle != null && subTitle !== '' && (
        <SubTitleElement
          id={subTitleId}
          className={cn('section-subTitle whitespace-pre-line', subTitleClass)}
        >
          {parseHighlightText(subTitle)}
        </SubTitleElement>
      )}

      {descriptionIntro != null && descriptionIntro !== '' && (
        <DescriptionIntroElement
          id={descriptionIntroId}
          className={cn('whitespace-pre-line', descriptionIntroClass)}
        >
          {parseHighlightText(descriptionIntro)}
        </DescriptionIntroElement>
      )}

      {description != null && description !== '' && (
        <DescriptionElement
          id={descriptionId}
          className={cn(
            'section-paragraph whitespace-pre-line',
            descriptionClass
          )}
        >
          {parseHighlightText(description)}
        </DescriptionElement>
      )}

      {descriptionOutro != null && descriptionOutro !== '' && (
        <DescriptionOutroElement
          id={descriptionOutroId}
          className={cn('whitespace-pre-line', descriptionOutroClass)}
        >
          {parseHighlightText(descriptionOutro)}
        </DescriptionOutroElement>
      )}
    </div>
  );
}
