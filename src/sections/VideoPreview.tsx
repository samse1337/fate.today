import { useEffect, useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const videos = [
  {
    title: '向夜晚奔去 ft.fate',
    url: 'https://b23.tv/IlW8fvQ',
    cover: '/video1.jpg',
  },
  {
    title: '成为末日 ft.Fate',
    url: 'https://b23.tv/d2ICzQx',
    cover: '/video2.jpg',
  },
];

export default function VideoPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.video-animate');
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

  return (
    <section
      id="video"
      ref={sectionRef}
      className="relative py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden w-full"
    >
      {/* 区块衔接渐变 */}
      <div className="absolute inset-0 section-gradient pointer-events-none" />
      
      {/* 局部光晕 */}
      <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-blue-600/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[250px] h-[250px] bg-blue-800/8 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-16 px-4">
          <h2 className="opal-title text-2xl sm:text-4xl lg:text-5xl tracking-tight mb-3 sm:mb-4">
            {t('video.title')}
          </h2>
          <p className="opal-subtitle text-base sm:text-lg lg:text-xl max-w-2xl mx-auto">
            {t('video.subtitle')}
          </p>
        </div>

        {/* Video grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-0">
          {videos.map((video, index) => (
            <div
              key={index}
              className="video-animate animate-initial video-card group overflow-hidden rounded-2xl"
            >
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {/* 视频封面区域 - 使用图片 */}
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={video.cover} 
                    alt={video.title}
                    className="video-cover w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* 渐变叠加 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                  
                  {/* 播放按钮 */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* 外部链接指示器 */}
                  <div className="absolute top-3 right-3 w-7 h-7 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="w-3.5 h-3.5 text-white" />
                  </div>
                  
                  {/* B站Logo */}
                  <div className="absolute bottom-3 left-3">
                    <span className="text-white/80 text-xs font-medium bg-black/30 backdrop-blur-sm px-2 py-1 rounded">Bilibili</span>
                  </div>
                </div>
                
                {/* 视频标题 */}
                <div className="p-4 bg-black/40 border-t border-white/5">
                  <h3 className="text-white text-base sm:text-lg font-semibold group-hover:text-blue-300 transition-colors line-clamp-1">
                    {video.title}
                  </h3>
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* Bilibili hint */}
        <div className="video-animate animate-initial delay-200 mt-8 sm:mt-10 text-center px-4">
          <p className="text-white/40 text-sm">
            {t('video.hint')}
          </p>
        </div>
      </div>
    </section>
  );
}
