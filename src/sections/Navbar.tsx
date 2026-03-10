import { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMenuClosing, setIsMenuClosing] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t('nav.home'), href: '#hero' },
    { label: t('nav.features'), href: '#features' },
    { label: t('nav.showcase'), href: '#showcase' },
    { label: t('nav.preview'), href: '#video' },
    { label: t('nav.purchase'), href: '#purchase' },
  ];

  const handleMenuClick = () => {
    if (isMobileMenuOpen) {
      // 关闭菜单 - 添加反向动画
      setIsMenuClosing(true);
      setTimeout(() => {
        setIsMobileMenuOpen(false);
        setIsMenuClosing(false);
      }, 300);
    } else {
      // 打开菜单
      setIsMenuClosing(false);
      setIsMobileMenuOpen(true);
    }
  };

  const handleLinkClick = () => {
    // 点击链接后关闭菜单 - 添加反向动画
    setIsMenuClosing(true);
    setTimeout(() => {
      setIsMobileMenuOpen(false);
      setIsMenuClosing(false);
    }, 300);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 w-full ${
          isScrolled ? 'navbar-blur' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <a href="#hero" className="flex items-center gap-2 sm:gap-3">
              <img
                src="/fate-logo.png"
                alt="Fate Client"
                className="w-7 h-7 sm:w-8 sm:h-8"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <span className="text-white font-semibold text-base sm:text-lg navbar-text-blur">Fate</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white/70 hover:text-white text-sm font-medium transition-colors navbar-text-blur"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right side - Language Switcher + Purchase button */}
            <div className="hidden md:flex items-center gap-3">
              <LanguageSwitcher />
              <a
                href="#purchase"
                className="inline-flex items-center gap-2 bg-white text-black px-3 sm:px-4 py-2 rounded-full text-sm font-medium hover:bg-white/90 transition-all"
              >
                <ShoppingCart className="w-4 h-4" />
                {t('nav.buyNow')}
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center gap-2 md:hidden">
              <LanguageSwitcher />
              <button
                className="text-white p-2 transition-transform duration-200 active:scale-95"
                onClick={handleMenuClick}
                aria-label="Toggle menu"
              >
                <div className={`menu-icon-transition ${isMobileMenuOpen && !isMenuClosing ? 'rotate-90' : ''}`}>
                  {isMobileMenuOpen && !isMenuClosing ? (
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                  ) : (
                    <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu - 带打开和关闭动画 */}
        {isMobileMenuOpen && (
          <div 
            className={`md:hidden navbar-blur border-t border-white/10 ${
              isMenuClosing ? 'mobile-menu-closing' : 'mobile-menu-opening'
            }`}
          >
            <div className="px-4 sm:px-6 py-4 space-y-1">
              {navLinks.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`mobile-menu-item block text-white/70 hover:text-white text-base font-medium transition-colors py-2 ${
                    isMenuClosing ? 'mobile-menu-item-out' : ''
                  }`}
                  onClick={handleLinkClick}
                  style={{ 
                    animationDelay: isMenuClosing ? `${(navLinks.length - index - 1) * 0.03}s` : `${index * 0.05}s` 
                  }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#purchase"
                className={`mobile-menu-item flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full text-base font-medium w-fit mt-3 ${
                  isMenuClosing ? 'mobile-menu-item-out' : ''
                }`}
                onClick={handleLinkClick}
                style={{ animationDelay: isMenuClosing ? '0s' : '0.25s' }}
              >
                <ShoppingCart className="w-4 h-4" />
                {t('nav.buyNow')}
              </a>
            </div>
          </div>
        )}
      </nav>
      {/* Spacer to prevent content from being hidden behind fixed navbar */}
      <div className="h-14 sm:h-16" />
    </>
  );
}
