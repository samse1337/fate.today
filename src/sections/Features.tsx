import { useEffect, useRef } from 'react';
import {
  Layers,
  Sparkles,
  RefreshCw,
  Monitor,
  Shield,
  Award,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.feature-card');
            elements.forEach((el, index) => {
              requestAnimationFrame(() => {
                setTimeout(() => {
                  el.classList.add('animate-fade-in-up');
                }, index * 80);
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

  const features = [
    {
      icon: Layers,
      title: t('features.rich'),
      description: t('features.richDesc'),
    },
    {
      icon: Sparkles,
      title: t('features.easy'),
      description: t('features.easyDesc'),
    },
    {
      icon: RefreshCw,
      title: t('features.update'),
      description: t('features.updateDesc'),
    },
    {
      icon: Monitor,
      title: t('features.platform'),
      description: t('features.platformDesc'),
    },
    {
      icon: Shield,
      title: t('features.trust'),
      description: t('features.trustDesc'),
    },
    {
      icon: Award,
      title: t('features.quality'),
      description: t('features.qualityDesc'),
    },
  ];

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden w-full"
    >
      {/* 区块衔接渐变 */}
      <div className="absolute inset-0 section-gradient pointer-events-none" />
      
      {/* 局部光晕 */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-800/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-16 px-4">
          <h2 className="opal-title text-2xl sm:text-4xl lg:text-5xl tracking-tight mb-3 sm:mb-4">
            {t('features.title')}
          </h2>
          <p className="opal-subtitle text-base sm:text-lg lg:text-xl max-w-2xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-2 sm:px-0">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="feature-card animate-initial bg-white/5 border border-white/10 rounded-xl p-5 sm:p-6 lg:p-8 card-hover"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 sm:mb-5">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                </div>
                <h3 className="text-white text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                  {feature.title}
                </h3>
                <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
