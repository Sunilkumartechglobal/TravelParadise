import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';  // Add this import
import './Navbar.css';

const SUPPORTED_LANGS = [
  { code: 'en', label: 'English', flag: '🇺🇸', nativeLabel: 'English' },
  { code: 'hi', label: 'Hindi', flag: '🇮🇳', nativeLabel: 'हिन्दी' },
  { code: 'ta', label: 'Tamil', flag: '🇮🇳', nativeLabel: 'தமிழ்' },
  { code: 'te', label: 'Telugu', flag: '🇮🇳', nativeLabel: 'తెలుగు' },
  { code: 'es', label: 'Spanish', flag: '🇪🇸', nativeLabel: 'Español' },
  { code: 'fr', label: 'French', flag: '🇫🇷', nativeLabel: 'Français' },
  { code: 'de', label: 'German', flag: '🇩🇪', nativeLabel: 'Deutsch' },
  { code: 'pt', label: 'Portuguese', flag: '🇵🇹', nativeLabel: 'Português' },
  { code: 'it', label: 'Italian', flag: '🇮🇹', nativeLabel: 'Italiano' },
  { code: 'ja', label: 'Japanese', flag: '🇯🇵', nativeLabel: '日本語' },
  { code: 'ko', label: 'Korean', flag: '🇰🇷', nativeLabel: '한국어' },
  { code: 'zh', label: 'Chinese', flag: '🇨🇳', nativeLabel: '中文' },
  { code: 'ar', label: 'Arabic', flag: '🇸🇦', nativeLabel: 'العربية' },
  { code: 'ru', label: 'Russian', flag: '🇷🇺', nativeLabel: 'Русский' },
  {
  code: 'ml',
  label: 'Malayalam',
  flag: '🇮🇳',
  nativeLabel: 'മലയാളം'
},
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { i18n } = useTranslation();  // Get i18n instance

  // Get current language from i18n
  const [lang, setLang] = useState(i18n.language || 'en');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sync local state with i18n language changes
  useEffect(() => {
    const handleLanguageChanged = (lng) => {
      setLang(lng);
    };

    i18n.on('languageChanged', handleLanguageChanged);
    return () => i18n.off('languageChanged', handleLanguageChanged);
  }, [i18n]);

  const handleLangChange = useCallback((langCode) => {
    i18n.changeLanguage(langCode);
    setIsDropdownOpen(false);
    localStorage.setItem('app:lang', langCode);
  }, [i18n]);

  // Load persisted language on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('app:lang');
    if (savedLang && SUPPORTED_LANGS.some(l => l.code === savedLang)) {
      handleLangChange(savedLang);
    }
  }, [handleLangChange]);

  const getCurrentLang = () => SUPPORTED_LANGS.find(l => l.code === lang) || SUPPORTED_LANGS[0];

  return (
    <div className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Brand */}
        <div className="navbar-brand">
          <div className="brand-logoH">
            <span className="brand-textH"><span style={{color: 'red'}}>T</span>ourism <span style={{color: 'red'}}>P</span>aradise</span>
          </div>
        </div>

        {/* Language Selector */}
        <div className="lang-switch" ref={dropdownRef}>
          <button
            className="lang-trigger"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-label="Select Language"
            aria-expanded={isDropdownOpen}
          >
            <span className="flag">{getCurrentLang().flag}</span>
            <span className="lang-label">{getCurrentLang().label}</span>
            <ChevronDown 
              className={`chevron ${isDropdownOpen ? 'chevron-open' : ''}`} 
              size={16} 
            />
          </button>

          {isDropdownOpen && (
            <div className="lang-dropdown">
              <div className="dropdown-header">
                <Globe size={16} />
                <span>Choose Language</span>
              </div>
              <div className="lang-list">
                {SUPPORTED_LANGS.map(language => (
                  <button
                    key={language.code}
                    className={`lang-option ${lang === language.code ? 'active' : ''}`}
                    onClick={() => handleLangChange(language.code)}
                  >
                    <span className="option-flag">{language.flag}</span>
                    <div className="option-text">
                      <span className="option-label">{language.label}</span>
                      <span className="option-native">{language.nativeLabel}</span>
                    </div>
                    {lang === language.code && (
                      <div className="check-mark">✓</div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
