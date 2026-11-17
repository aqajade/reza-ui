// src/app/page.tsx
import App from "./App";
import type { Language } from "@/types/math/itqan-math";

export type HomePageProps = {
  searchParams: Promise<{ lang?: string }>;
};

export default async function Home({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const lang: Language = params?.lang === 'id' ? 'id' : 'en';

  return <App lang={lang} />;
}

