import { useEffect, useRef } from 'react';
import { Download, ArrowRight } from 'lucide-react';

export default function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.cta-animate');
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('animate-fade-in-up');
              }, index * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="relative py-24 lg:py-32 px-6 lg:px-8 overflow-hidden"
    >
      {/* Blue flowing light */}
      <div className="absolute inset-0 flowing-light pointer-events-none" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[200px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-blue-800/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 left-1/4 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="cta-animate animate-initial text-white text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-6">
          提升你的我的世界体验
        </h2>
        <p className="cta-animate animate-initial delay-100 text-blue-100/60 text-lg sm:text-xl lg:text-2xl mb-10">
          从这里开始你的旅程
        </p>
        
        <div className="cta-animate animate-initial delay-200 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            className="btn-primary inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-medium text-base hover:bg-white/90"
            onClick={() => {
              alert('下载功能即将上线，敬请期待！');
            }}
          >
            <Download className="w-5 h-5" />
            立即下载
          </button>
          <a
            href="#features"
            className="btn-secondary inline-flex items-center gap-2 border border-blue-400/30 text-white px-8 py-4 rounded-full font-medium text-base"
          >
            查看功能
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>

        {/* Download info */}
        <div className="cta-animate animate-initial delay-300 mt-12 flex flex-wrap items-center justify-center gap-6 text-blue-100/50 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full" />
            支持 Windows 10/11
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full" />
            支持 macOS
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full" />
            支持 Linux
          </div>
        </div>
      </div>
    </section>
  );
}
