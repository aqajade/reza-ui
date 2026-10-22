// src/data/landing-page-data.ts
import ecoImg from '@/../public/images/eco/ecoo.png';
import expertiseImg from '@/../public/images/expertise/expertisee.png';
import exploreImg from '@/../public/images/explore/exploree.png';
import heroImg from '@/../public/images/hero/heroooo.png';
import logoImg from '@/../public/images/hero/logo.png';
import networkImg from '@/../public/images/network/networkk.png';
import processImg from '@/../public/images/process/processs.png';
import tailoredImg from '@/../public/images/tailored/tailoredd.png';
import teamImg from '@/../public/images/team/team.png';
import trackingImg from '@/../public/images/tracking/trackingg.png';
import { LandingPageConfig } from '@/types/layout/landing-page';
// import { RawImageConfig } from '@/types/layout/page-config';
export const landingPageData: LandingPageConfig = {
  header: {
    section: {
      layout: {
        stackElement: 'header',
      },
    },
  },

  /** 2. HERO SECTION (JANGAN DIUTAK-ATIK) */
  hero: {
    section: {
      layout: {
        id: 'hero',
        stackDirection: 'col',
        stackClass:
          'pt-[clamp(27px, 23.9971px + 0.7641vw, 35px)] pb-[clamp(65px, 58.2436px + 1.7192vw, 83px)]',
      },
      header: {
        headerClass:
          'w-[clamp(350px,277.9312px+18.3381vw,542px)] items-center justify-center gap-6',
        title: 'Welcome to \n Our Freight Forwarding Services',
        titleClass:
          'w-[clamp(335px,249.043px+21.872vw,564px)] text-[clamp(55px,50.1203px+1.2416vw,68px)] leading-17 font-black text-primary-400 text-center',
        subTitle: 'TUI Logistik Indonesia',
        subTitleClass:
          'order-3 text-primary-400 text-center text-[clamp(29px,24.8711px+1.0506vw,40px)] font-black',
        // description:'We provide reliable and efficient freight forwarding solutions tailored to meet your business needs and ensure seamless shipping.',
        description:
          'A Reliable freight forwarding solutions to meet your business needs. We ensure the smooth, efficient, and timely delivery of your cargo.',
        descriptionClass: 'text-[22px] text-primary-400',
      },
      image: {
        src: logoImg,
        alt: 'logo image',
        priority: true,
        minWidth: 137,
        maxWidth: 171,
        containerClass: 'overflow-hidden rounded-2xl',
      },
    },
    content: {
      image: {
        src: heroImg,
        alt: 'hero image',
        priority: true,
        minWidth: 361,
        maxWidth: 497,
        containerClass: 'lg:pt-10.5 overflow-hidden rounded-2xl',
      },
    },
  },

  /** 3. TAILORED SECTION (section: Kiri Gambar Kapal, Kanan Teks Deskripsi) */
  tailored: {
    section: {
      layout: {
        id: 'tailored',
      },
      header: {
        title: 'STREAMLINED LOGISTICS SOLUTIONS',
        titleElement: 'h2',
        titleClass:
          'text-[clamp(43px,35.8682px+1.8147vw,62px)] leading-11 text-left font-black text-primary-400',
      },
    },
    content: {
      image: {
        src: tailoredImg,
        alt: 'TUI Logistik Cargo Ship Illustration',
        minWidth: 341,
        maxWidth: 574,
        elementClass: 'rounded-2xl',
        // containerClass: 'w-[clamp(341px,253.5415px+22.2541vw,574px)]'
      },
      header: {
        headerClass: 'text-left',
        title: 'Tailored logistics to enhance your efficiency',
        titleElement: 'h3',
        subTitle: 'Simplifying your shipping experience',
        subTitleElement: 'h4',
        descriptionIntro:
          'Understand the complexities of freight forwarding and strive to simplify the process for you by leveraging our extensive network and innovative technologies. Focus on your business strategy, we take care of your delivery.',
        descriptionOutro: '',
        titleClass:
          'text-2xl leading-[clamp(28px,23.4957px+1.1461vw,40px)] lg:text-3xl font-extrabold text-primary-300 tracking-tight',
        subTitleClass:
          ' text-lg lg:text-xl font-bold pt-[clamp(34px,30.2464px+0.9551vw,44px)] pb-[clamp(4px,1.7479px+0.5731vw,10px)] leading-6 text-primary-300',
        descriptionIntroClass: 'text-[17.8px] text-primary-300 mt-2',
        descriptionOutroClass: 'text-[17.8px] font-normal text-primary-300',
      },
    },
  },

  /** 4. EXPERTISE SECTION (section: Kiri Teks Pertanyaan, Kanan Gambar Kapal Cargo) */
  expertise: {
    section: {
      layout: {
        id: 'expertise',
      },
      header: {
        headerClass: 'text-left', // Mengatur jarak flex vertikal antar baris teks kartu
        title: 'Expertise in Freight Forwarding',
        titleElement: 'h3',
        subTitle: 'Why Trust Our Experienced Team?',
        subTitleElement: 'h4',
        descriptionIntro:
          "Our freight forwarding services ensure [seamless logistics] tailored to your business's unique needs. With years of experience in the industry, we navigate complex shipping routes and regulations on your behalf, providing peace of mind.",
        descriptionOutro:
          'We pride ourselves on our [dedication to customer satisfaction]. Our knowledgeable team is committed to delivering efficient solutions, ensuring that your shipments arrive on time and intact, no matter where in the world they are headed.',

        // Tumpahkan seluruh paketan class tipografi diverse dari Excel kamu ke sini
        titleClass:
          'text-2xl leading-[clamp(28px,23.4957px+1.1461vw,40px)] lg:text-3xl font-extrabold text-primary-300 tracking-tight',
        subTitleClass:
          ' text-lg lg:text-xl font-bold pt-[clamp(34px,30.2464px+0.9551vw,44px)] pb-[clamp(4px,1.7479px+0.5731vw,10px)] leading-6 text-primary-300',
        descriptionIntroClass: 'text-[17.8px] text-primary-300 mt-2',
        descriptionOutroClass: 'text-[17.8px] font-normal text-primary-300',
      },
      image: {
        src: expertiseImg,
        alt: 'TUI Logistik Cargo Ship Illustration',
        minWidth: 341,
        maxWidth: 574,
        elementClass: 'rounded-2xl',
        // containerClass: 'w-[clamp(341px,253.5415px+22.2541vw,574px)]'
      },
    },
  },

  // /** 5. TRACKING SECTION (section: Kiri Gambar Monitor Map, Kanan Teks Fitur) */
  tracking: {
    section: {
      layout: {
        id: 'tracking',
      },
      header: {
        headerClass: 'text-left', // Mengatur jarak flex vertikal antar baris teks kartu
        title: 'Efficiently track your shipments at every stage',
        titleElement: 'h3',
        subTitle: 'Reliable tracking and shipment management solutions',
        subTitleElement: 'h4',
        descriptionIntro:
          "Our freight forwarding services prioritize [comprehensive tracking] and management for all shipments, ensuring you have real-time visibility into your cargo's journey. This commitment allows you to stay informed and make timely decisions that benefit your business.",
        descriptionOutro:
          'By leveraging cutting-edge technology, we provide detailed updates and analytics that enhance your logistics experience. Our goal is to ensure your shipments are handled with care, arriving safely and on schedule, while you focus on growing your business.',

        // Tumpahkan seluruh paketan class tipografi diverse dari Excel kamu ke sini
        titleClass:
          'text-2xl leading-[clamp(28px,23.4957px+1.1461vw,40px)] lg:text-3xl font-extrabold text-primary-300 tracking-tight',
        subTitleClass:
          ' text-lg lg:text-xl font-bold pt-[clamp(34px,30.2464px+0.9551vw,44px)] pb-[clamp(4px,1.7479px+0.5731vw,10px)] leading-6 text-primary-300',
        descriptionIntroClass: 'text-[17.8px] text-primary-300 mt-2',
        descriptionOutroClass: 'text-[17.8px] font-normal text-primary-300',
      },
      image: {
        src: trackingImg,
        alt: 'TUI Logistik Cargo Ship Illustration',
        minWidth: 341,
        maxWidth: 574,
        elementClass: 'rounded-2xl',
        // containerClass: 'w-[clamp(341px,253.5415px+22.2541vw,574px)]'
      },
    },
  },

  // /** 6. NETWORK SECTION (section: Kiri Teks Jaringan, Kanan Gambar Ilustrasi) */
  network: {
    section: {
      layout: {
        id: 'network',
      },
      header: {
        headerClass: 'text-left',
        title: 'Our extensive global network ensures timely deliveries',
        titleElement: 'h3',
        subTitle: 'Efficient logistics for your international shipments',
        subTitleElement: 'h4',
        descriptionIntro:
          'At our company, we pride ourselves on having a [robust global network] that facilitates efficient logistics solutions across multiple regions. With strategic partnerships and local expertise, we navigate the complexities of international shipping to ensure your goods arrive on time and in perfect condition.',
        descriptionOutro:
          'Our team is committed to [providing exceptional service]. By leveraging technology and our extensive contacts, we streamline the shipping process, making it hassle-free for our clients. Trust us to handle your logistics needs with professionalism and care.',

        // Tumpahkan seluruh paketan class tipografi diverse dari Excel kamu ke sini
        titleClass:
          'text-2xl leading-[clamp(28px,23.4957px+1.1461vw,40px)] lg:text-3xl font-extrabold text-primary-300 tracking-tight',
        subTitleClass:
          ' text-lg lg:text-xl font-bold pt-[clamp(34px,30.2464px+0.9551vw,44px)] pb-[clamp(4px,1.7479px+0.5731vw,10px)] leading-6 text-primary-300',
        descriptionIntroClass: 'text-[17.8px] text-primary-300 mt-2',
        descriptionOutroClass: 'text-[17.8px] font-normal text-primary-300',
      },
      image: {
        src: networkImg,
        alt: 'TUI Logistik Cargo Ship Illustration',
        minWidth: 341,
        maxWidth: 574,
        elementClass: 'rounded-2xl',
        // containerClass: 'w-[clamp(341px,253.5415px+22.2541vw,574px)]'
      },
    },
  },

  // /** 7. ECO SECTION (section: Kiri Gambar Depan Kapal, Kanan Teks Eco) */
  eco: {
    section: {
      layout: {
        id: 'eco',
      },
      header: {
        headerClass: 'text-left',
        title: 'Committing to eco-friendly logistics solutions',
        titleElement: 'h3',
        subTitle: 'Innovating for a greener tomorrow',
        subTitleElement: 'h4',
        descriptionIntro:
          'At our freight forwarding company, we believe in [sustainable practices] that minimize our environmental footprint. Our commitment includes using energy-efficient transport options, optimizing routing to reduce emissions, and collaborating with partners who share our vision for a greener future.',
        descriptionOutro:
          'By integrating these practices, we aim to create a more sustainable supply chain that benefits both our clients and the planet.',
        titleClass:
          'text-2xl leading-[clamp(28px,23.4957px+1.1461vw,40px)] lg:text-3xl font-extrabold text-primary-300 tracking-tight',
        subTitleClass:
          ' text-lg lg:text-xl font-bold pt-[clamp(34px,30.2464px+0.9551vw,44px)] pb-[clamp(4px,1.7479px+0.5731vw,10px)] leading-6 text-primary-300',
        descriptionIntroClass: 'text-[17.8px] text-primary-300 mt-2',
        descriptionOutroClass: 'text-[17.8px] font-normal text-primary-300',
      },
      image: {
        src: ecoImg,
        alt: 'TUI Logistik Cargo Ship Illustration',
        minWidth: 341,
        maxWidth: 574,
        elementClass: 'rounded-2xl',
        // containerClass: 'w-[clamp(341px,253.5415px+22.2541vw,574px)]'
      },
    },
  },

  // /** 8. SERVICES SECTION (section: Grid 3 Kolom Kartu Sejajar Sesuai Gambar) */
  services: {
    section: {
      layout: {
        id: 'tailored',
      },
      header: {
        title: 'OUR FREIGHT FORWARDING SERVICES',
        titleElement: 'h2',
        titleClass:
          'text-[clamp(46px,40.3696px+1.4327vw,61px)] leading-11 text-center font-black text-primary-400',
      },
      grid: {
        gridClass:
          'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8',
      },
      card: {
        layout: {
          stackClass:
            'flex flex-col gap-6 p-8 rounded-xl bg-primary-200 text-center items-center justify-start border h-[clamp(360px,300.6934px+15.0907vw,480px)]',
        },
        header: {
          headerClass:
            'flex flex-col gap-[clamp(24px,-3.0258px+6.8768vw,96px)]',
          titleElement: 'h3',
          titleClass:
            'text-[24px] lg:text-2xl font-extrabold text-primary-300 leading-tight tracking-wide',
          descriptionClass:
            'text-md lg:text-lg text-primary-300 leading-6 font-medium',
        },
      },
      data: [
        {
          title: 'Air Freight Solutions for Swift Deliveries',
          description:
            'Our air freight services ensure [rapid transit] of goods, tailored to meet your business deadlines, while maintaining cost-effectiveness and reliability throughout the shipping process.',
        },
        {
          title: 'Ocean Freight for Large Shipments',
          description:
            'We offer comprehensive ocean freight solutions, ideal for bulk shipments. Our expertise guarantees safe and efficient transport across global waters, accommodating diverse cargo types and sizes.',
        },
        {
          title: 'Land Transport for Local and Regional Needs',
          description:
            'Our land transport services connect your shipments efficiently within local and regional markets, utilizing a robust network of vehicles to ensure timely deliveries and seamless logistics management.',
        },
      ],
    },
  },

  explore: {
    section: {
      layout: {
        id: 'explore',
        // containerClass: 'max-w-360 flex justify-center',
        stackClass:
          'lg:flex-row justify-center items-center gap-[clamp(12px,-6.0172px+4.5845vw,60px)]',
      },
      header: {
        title: 'Explore Our Solutions',
        titleElement: 'h2',
        //text 58
        titleClass:
          'font-black text-primary-300 text-left tracking-tight text-[58px] leading-15',
      },
      image: {
        src: exploreImg,
        alt: 'TUI Logistik Cargo Ship Illustration',
        minWidth: 360,
        maxWidth: 574,
        elementClass: '',
        // containerClass: 'w-[clamp(341px,253.5415px+22.2541vw,574px)]'
      },
    },
    content: {
      layout: {
        //gap
        stackClass:
          'flex w-full flex-col justify-center gap-[clamp(32px,13.9828px+4.5845vw,80px)] lg:max-w-[50%]',
      },
    },
    detail: {
      layout: {
        //gap 2
        stackClass:
          'w-full justify-center gap-[clamp(8px,4.9971px+0.7641vw,16px)] rounded-3xl',
      },
      card: {
        layout: {
          stackClass:
            'flex flex-col gap-1 px-5 py-3 rounded-2xl bg-primary-500 text-white text-left shadow-sm w-full min-w-70 max-w-130',
        },
        header: {
          headerClass: 'flex flex-col gap-1 text-left',
          titleClass:
            'text-lg lg:text-2xl font-bold text-primary-200 leading-snug',
          titleElement: 'h3',
          descriptionClass:
            'text-sm lg:text-base text-white/80 font-normal leading-normal',
        },
      },
      data: [
        {
          title: 'Fast Shipping Options',
          description: 'Get solution for the fast shipping options',
        },
        {
          title: 'Competitive Rates Offered',
          description: 'Get the Best Price',
        },
        {
          title: 'Customized Services Available',
          description: 'Get Started Today',
        },
      ],
    },
  },

  // /** 9. process */
  process: {
    section: {
      layout: {
        id: 'process',
        //gap 15
        stackClass: 'lg:flex-row gap-3.75',
      },
      header: {
        // gap
        headerClass:
          'gap-[clamp(15px,10.1203px+1.2416vw,28px)] lg:max-w-[50%] lg:px-15 lg:py-20',
        title: 'Understanding Freight Forwarding Process',
        titleElement: 'h2',
        //text
        //leading
        titleClass:
          'font-black text-primary-300 text-left tracking-tight text-[clamp(44px,38.7450px+1.3372vw,58px)] leading-[clamp(40px,36.2464px+0.9551vw,50px)] ',
        description:
          "The [freight forwarding process](font-black) involves several crucial steps, beginning with pickup from the sender's location. Our team ensures that your shipment is securely packed and loaded onto the appropriate transport mode, whether by land, sea, or air. We manage every aspect until your goods reach their final destination, ensuring efficiency and reliability at every stage.",
        descriptionClass: 'text-[17.8px] text-primary-300 text-left',
      },
      image: {
        src: processImg,
        alt: 'TUI Logistik Cargo Ship Illustration',
        minWidth: 360,
        maxWidth: 574,
        elementClass: '',
        loading: 'eager',
        // containerClass: 'w-[clamp(341px,253.5415px+22.2541vw,574px)]'
      },
    },
  },

  // /** 11. TEAM SECTION */
  team: {
    section: {
      layout: {
        id: 'team',
      },
      header: {
        title: 'MOVING FORWARD AS ONE',
        titleElement: 'h2',
        titleClass:
          'text-primary-300 text-[clamp(46px,40.3696px+1.4327vw,61px)] leading-11 text-center font-black',
      },
      image: {
        src: teamImg,
        alt: 'TUI Logistik Cargo Ship Illustration',
        minWidth: 360,
        maxWidth: 1100,
        aspectRatio:'3/1.8',
        containerClass: 'mx-auto',
        elementClass: 'scale-100',
        loading: 'eager',
        // containerClass: 'w-[clamp(341px,253.5415px+22.2541vw,574px)]'
      },
    },
  },

  // /** 12. FOOTER SECTION */ta
  footer: {
    section: {
      layout: {
        id: 'footer',
        stackElement: 'footer', //
        stackClass:
          'gap-[clamp(60px,14.9570px+11.4613vw,180px)] text-primary-400',
      },
      header: {
        //
        headerClass: 'text-left gap-[clamp(15px,7.4928px+1.9102vw,35px)]',
        title: 'Connect with us today for \n seamless logistics support!', //
        titleClass:
          'text-[clamp(55px,51.2464px+0.9551vw,65px)] leading-[clamp(50px,48.1232px+0.4776vw,55px)] order-2 font-black',
        subTitle: 'Freight Forwarding Solutions',
        //
        subTitleClass:
          'text-[clamp(22px,20.8739px+0.2865vw,25px)] order-1 font-black ',
      },
    },
    content: {
      layout: {
        //8
        stackClass: 'gap-2 lg:flex-row lg:justify-between lg:items-end',
      },
      header: {
        headerClass: 'text-left',
        title: 'GET IN TOUCH NOW',
        //  8
        titleClass:
          'text-[clamp(22px,20.4986px+0.3820vw,26px)] font-bold pb-2',
        descriptionIntro: 'Phone: +62 21 8285 0201',
        description: 'Mobile (WhatsApp): +62 877 8787 3352',
        descriptionOutro: 'Email: sales@tuilogis.com',
      },
    },
    detail: {
      header: {
        headerClass: 'text-left',
        descriptionIntro: 'Address: Jl. Padang No. 5A, Kel. Pasar Manggis',
        descriptionOutro: 'Kec. Setiabudi Jakarta Selatan, Indonesia',
      },
    },
  },
  // footer: {
  //   section: {
  //     id: 'tui-footer',
  //     title: 'Connect with us today for seamless logistics support!',
  //     subTitle: 'Freight Forwarding Solutions',
  //     stackElement: 'footer',
  //     stackClass: 'bg-[#1b4332] text-white py-16',
  //   },
  //   content: {
  //     title: 'GET IN TOUCH NOW',
  //     description: '© TUI Logistics Indonesia. All Rights Reserved.',
  //     descriptionIntro:
  //       'Jl. Logistik Utama No. 46, Kawasan Industri Tanjung Priok, Jakarta Utara, Indonesia',
  //     descriptionOutro:
  //       'Email: support@tuilogistics.co.id | Phone: +62 21-5555-6789',
  //   },
  //   detail: {
  //     descriptionIntro: 'Address: Jl. Padang No. 5A, Kel, Pasar Manggis',
  //     descriptionOutro: 'Kec. Setiabudi Jakarta Selatan, Indonesia',
  //   },
  // },
};
// test
