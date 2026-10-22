import { PageRenderer } from '@/components/renderer/PageRenderer';
import { landingPage } from '@/compositions/landing-page';

export default function App() {
  return (
    <main className='font-inter'>
      <PageRenderer page={landingPage} />
    </main>
  );
}
