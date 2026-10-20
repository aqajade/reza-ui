import { Eco } from '@/components/sections/Eco';
import { Expertise } from '@/components/sections/Expertise';
import { Explore } from '@/components/sections/Explore';
import { Footer } from '@/components/sections/Footer';
import { Hero } from '@/components/sections/Hero';
import { Network } from '@/components/sections/Network';
import { Process } from '@/components/sections/Process';
import { Services } from '@/components/sections/Services';
import { Tailored } from '@/components/sections/Tailored';
import { Team } from '@/components/sections/Team';
import { Tracking } from '@/components/sections/Tracking';

export default function Home() {
  return (
    <div className='font-inter bg-reza-100'>
      <Hero className='bg-reza-100'/>
      <Tailored className='bg-primary-200'/>
      <Expertise className='bg-reza-100'/>
      <Tracking className='bg-primary-200'/>
      <Network className='bg-reza-100'/>
      <Eco className='bg-primary-200'/>
      <Services className='bg-reza-100'/>
      <Process className='bg-primary-200'/>
      <Explore className='bg-reza-100'/>
      <Team className='bg-primary-200'/>
      <Footer className='bg-reza-100'/>
    </div>
  );
}
