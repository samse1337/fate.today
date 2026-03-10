import { useEffect, useRef } from 'react';
import { Gamepad2, Eye, Sword, Settings, ShoppingCart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Showcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.showcase-item');
            elements.forEach((el, index) => {
              requestAnimationFrame(() => {
                setTimeout(() => {
                  el.classList.add('animate-fade-in-up');
                }, index * 100);
              });
            });
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '50px 0px 0px 0px' }
    );

    if (sectionRef.current) {
      observerRef.current.observe(sectionRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const showcases = [
    {
      icon: Gamepad2,
      title: t('showcase.hud'),
      description: t('showcase.hudDesc'),
    },
    {
      icon: Eye,
      title: t('showcase.xray'),
      description: t('showcase.xrayDesc'),
    },
    {
      icon: Sword,
      title: t('showcase.pvp'),
      description: t('showcase.pvpDesc'),
    },
    {
      icon: Settings,
      title: t('showcase.config'),
      description: t('showcase.configDesc'),
    },
  ];

  return (
    <section
      id="showcase"
      ref={sectionRef}
      className="relative py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden w-full"
    >
      {/* 区块衔接渐变 */}
      <div className="absolute inset-0 section-gradient pointer-events-none" />
      
      {/* 局部光晕 */}
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-blue-700/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-[300px] h-[300px] bg-blue-500/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-16 px-4">
          <h2 className="opal-title text-2xl sm:text-4xl lg:text-5xl tracking-tight mb-3 sm:mb-4">
            {t('showcase.title')}
          </h2>
          <p className="opal-subtitle text-base sm:text-lg lg:text-xl max-w-2xl mx-auto">
            {t('showcase.subtitle')}
          </p>
        </div>

        {/* Showcase grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-0">
          {showcases.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="showcase-item animate-initial group relative bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 lg:p-10 overflow-hidden card-hover"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-500/15 rounded-xl flex items-center justify-center mb-5 sm:mb-6 group-hover:bg-blue-500/25 transition-colors">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400" />
                  </div>
                  <h3 className="text-white text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">
                    {item.title}
                  </h3>
                  <p className="text-white/50 text-base sm:text-lg leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature highlight */}
        <div className="mt-10 sm:mt-16 showcase-item animate-initial px-2 sm:px-0">
          <div className="relative bg-gradient-to-r from-blue-900/30 to-blue-950/20 border border-white/10 rounded-2xl p-6 sm:p-8 lg:p-12 overflow-hidden card-hover">
            <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-blue-500/10 rounded-full blur-[60px] sm:blur-[80px] pointer-events-none" />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12">
              <div className="flex-1 text-center lg:text-left">
                <h3 className="opal-title text-xl sm:text-2xl lg:text-3xl mb-3 sm:mb-4">
                  {t('showcase.more')}
                </h3>
                <p className="text-white/60 text-base sm:text-lg mb-5 sm:mb-6">
                  {t('showcase.moreDesc')}
                </p>
                <a
                  href="#purchase"
                  className="btn-purchase inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium text-sm"
                >
                  <ShoppingCart className="w-4 h-4" />
                  {t('nav.buyNow')}
                </a>
              </div>
              <div className="flex-shrink-0">
                <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-400/20">
                  <img
                    src={`${import.meta.env.BASE_URL}fate-logo.png`}
                    alt="Fate Client"
                    className="w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24"
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
