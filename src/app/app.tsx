// src/app/App.tsx
import { PageRenderer } from '@/components/renderer/PageRenderer';
import { getLandingPage } from '@/compositions/landing-page';
import type { Language } from '@/types/math/itqan-math';

export type AppProps = {
  lang?: Language;
};

export default function App({ lang = 'en' }: AppProps) {
  const page = getLandingPage(lang);

  return (
    <main className="font-inter">
      <PageRenderer page={page} />
    </main>
  );
}

