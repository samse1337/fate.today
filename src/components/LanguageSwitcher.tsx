import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe, Check } from 'lucide-react';

type Language = 'en' | 'zh' | 'ja' | 'ko' | 'fr' | 'ru' | 'de';

interface LanguageOption {
  code: Language;
  label: string;
  flag: string;
}

const languages: LanguageOption[] = [
  { code: 'en', label: 'English', flag: 'EN' },
  { code: 'zh', label: '简体中文', flag: 'CN' },
  { code: 'ja', label: '日本語', flag: 'JP' },
  { code: 'ko', label: '한국어', flag: 'KR' },
  { code: 'fr', label: 'Français', flag: 'FR' },
  { code: 'ru', label: 'Русский', flag: 'RU' },
  { code: 'de', label: 'Deutsch', flag: 'DE' },
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find(l => l.code === language);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const closeDropdown = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 200);
  };

  const handleToggle = () => {
    if (isOpen) {
      closeDropdown();
    } else {
      setIsOpen(true);
    }
  };

  const handleSelect = (code: Language) => {
    setLanguage(code);
    closeDropdown();
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={handleToggle}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 border border-blue-400/30 rounded-full text-blue-300 hover:text-white hover:bg-blue-500/20 hover:border-blue-400/50 transition-all text-sm font-medium"
        aria-label="Switch Language"
      >
        <Globe className="w-4 h-4" />
        <span>{currentLang?.flag}</span>
      </button>

      {isOpen && (
        <div className={`language-dropdown ${isClosing ? 'closing' : 'opening'}`}>
          {languages.map((lang, index) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={`language-option ${language === lang.code ? 'active' : ''}`}
              style={{ animationDelay: `${index * 0.03}s` }}
            >
              <span className="flex items-center gap-2">
                <span className="language-flag">{lang.flag}</span>
                {lang.label}
              </span>
              {language === lang.code && <Check className="w-4 h-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
