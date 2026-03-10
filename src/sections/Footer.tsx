import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t, language } = useLanguage();

  const footerLinks = {
    product: {
      title: t('footer.product'),
      links: [
        { label: t('nav.purchase'), href: '#purchase' },
        { label: t('nav.features'), href: '#features' },
        { label: t('nav.preview'), href: '#video' },
        { label: language === 'zh' ? '更新日志' : 'Changelog', href: '#' },
      ],
    },
    support: {
      title: t('footer.support'),
      links: [
        { label: t('footer.faq'), href: '#' },
        { label: t('footer.contact'), href: '#contact' },
        { label: t('footer.feedback'), href: '#' },
      ],
    },
    legal: {
      title: t('footer.legal'),
      links: [
        { label: t('footer.terms'), href: '#' },
        { label: t('footer.privacy'), href: '#' },
      ],
    },
  };

  return (
    <footer className="relative border-t border-white/10 overflow-hidden w-full">
      {/* 区块衔接渐变 */}
      <div className="absolute inset-0 section-gradient pointer-events-none" />
      
      {/* 局部光晕 */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-blue-900/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 w-full">
        {/* Top section */}
        <div className="flex flex-col lg:flex-row justify-between gap-10 sm:gap-12 lg:gap-20 mb-10 sm:mb-12">
          {/* Brand */}
          <div className="max-w-sm">
            <a href="#hero" className="flex items-center gap-2 sm:gap-3 mb-4">
              <img
                src={`${import.meta.env.BASE_URL}fate-logo.png`}
                alt="Fate Client"
                className="w-8 h-8 sm:w-10 sm:h-10"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <span className="text-white text-lg sm:text-xl font-semibold">Fate</span>
            </a>
            <p className="text-white/50 text-sm sm:text-base">
              {t('footer.slogan')}
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-16">
            {Object.values(footerLinks).map((section) => (
              <div key={section.title}>
                <h4 className="text-white font-semibold text-sm mb-3 sm:mb-4">
                  {section.title}
                </h4>
                <ul className="space-y-2 sm:space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-white/50 hover:text-blue-300 text-sm transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <p className="text-white/40 text-xs sm:text-sm">
              © 2026 Fate Client. All rights reserved.
            </p>
            <p className="text-white/40 text-xs sm:text-sm">
              {t('footer.rights')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
