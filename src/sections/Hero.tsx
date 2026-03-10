import { useEffect, useRef } from 'react';
import { ShoppingCart, ChevronDown, Box, Sword, Crown, Layout } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '50px 0px 0px 0px' }
    );

    const elements = heroRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const features = [
    { name: t('hero.feature1'), icon: Box },
    { name: t('hero.feature2'), icon: Sword },
    { name: t('hero.feature3'), icon: Crown },
    { name: t('hero.feature4'), icon: Layout },
  ];

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 overflow-hidden w-full"
    >
      <div className="relative z-10 text-center max-w-5xl mx-auto w-full">
        {/* Logo and brand - 白色辉光 */}
        <div className="animate-on-scroll animate-initial mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <img
              src={`${import.meta.env.BASE_URL}fate-logo.png`}
              alt="Fate Client"
              className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 logo-glow"
              style={{ filter: 'brightness(0) invert(1) drop-shadow(0 0 20px rgba(255,255,255,0.6)) drop-shadow(0 0 40px rgba(255,255,255,0.3))' }}
            />
            <span className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
              Fate Client
            </span>
          </div>
        </div>

        {/* Main headline - Opal风格 */}
        <h1 className="animate-on-scroll animate-initial delay-100 opal-title text-4xl sm:text-5xl lg:text-7xl tracking-tight leading-tight mb-4 sm:mb-6">
          {t('hero.title')}
        </h1>

        {/* Subtitle - Opal风格 */}
        <p className="animate-on-scroll animate-initial delay-200 opal-subtitle text-lg sm:text-xl lg:text-2xl max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-4">
          {t('hero.subtitle')}
        </p>

        {/* Feature tags */}
        <div className="animate-on-scroll animate-initial delay-250 flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 px-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <span
                key={index}
                className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 bg-blue-500/10 border border-blue-400/30 rounded-full text-blue-200 text-xs sm:text-sm"
              >
                <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                {feature.name}
              </span>
            );
          })}
        </div>

        {/* CTA Buttons */}
        <div className="animate-on-scroll animate-initial delay-300 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
          <a
            href="#purchase"
            className="btn-purchase inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium text-sm"
          >
            <ShoppingCart className="w-4 h-4" />
            {t('nav.buyNow')}
          </a>
          <a
            href="#video"
            className="btn-secondary inline-flex items-center gap-2 border border-blue-400/30 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium text-sm"
          >
            {t('hero.watchPreview')}
            <ChevronDown className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400/60" />
      </div>
    </section>
  );
}
