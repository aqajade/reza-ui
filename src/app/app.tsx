
import { PageRenderer } from '@/components/renderer/PageRenderer';
import { landingPageConfig } from '@/config/landing-page-config';

export default function App() {
  return (
    <main className="font-inter">
      <PageRenderer config={landingPageConfig} />
    </main>
  );
}
