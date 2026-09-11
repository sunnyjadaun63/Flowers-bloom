import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Leaf, Palette, Check } from 'lucide-react';

export default function ThemeSwitcher({ isMobile = false }) {
  const { theme, setTheme, THEMES } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getThemeIcon = (tId, className = "w-3.5 h-3.5") => {
    switch (tId) {
      case 'dark':
        return <Moon className={className} />;
      case 'emerald':
        return <Leaf className={className} />;
      default:
        return <Sun className={className} />;
    }
  };

  const currentThemeObj = THEMES.find(t => t.id === theme) || THEMES[0];

  if (isMobile) {
    return (
      <div className="p-3 bg-stone-50 border border-stone-line rounded-sm space-y-2">
        <div className="flex items-center space-x-2 text-xs font-semibold text-charcoal">
          <Palette className="w-3.5 h-3.5 text-botanical" />
          <span className="uppercase tracking-wider text-[10px]">Select Color Theme:</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {THEMES.map((t) => {
            const active = theme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`py-2 px-2 rounded-xs text-[11px] font-medium flex flex-col items-center justify-center space-y-1 transition-all border ${
                  active 
                    ? 'border-botanical bg-white shadow-xs font-semibold text-charcoal ring-1 ring-botanical' 
                    : 'border-stone-line/70 bg-stone-100/50 text-warm-neutral hover:text-charcoal hover:bg-white'
                }`}
              >
                <div className="flex items-center space-x-1">
                  {getThemeIcon(t.id, 'w-3 h-3')}
                  <span className="truncate">{t.id === 'light' ? 'Light' : t.id === 'dark' ? 'Dark' : 'Emerald'}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-full border border-stone-line/80 bg-stone-50 hover:bg-white hover:border-botanical text-charcoal text-[11px] font-medium transition-all duration-150 shadow-2xs"
        aria-label="Toggle Color Theme"
        title={`Current Theme: ${currentThemeObj.name}`}
      >
        <span className="text-botanical">
          {getThemeIcon(theme, "w-3.5 h-3.5")}
        </span>
        <span className="hidden sm:inline-block font-sans text-[11px] font-semibold tracking-wide">
          {theme === 'light' ? 'Light' : theme === 'dark' ? 'Dark' : 'Emerald'}
        </span>
      </button>

      {/* Dropdown Options */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-52 bg-white border border-stone-line rounded-sm shadow-xl py-1.5 z-60 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1.5 border-b border-stone-line/60">
            <span className="text-[9px] uppercase tracking-widest font-bold text-warm-neutral block">
              Color Themes
            </span>
          </div>

          <div className="py-1">
            {THEMES.map((t) => {
              const active = theme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id);
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 flex items-center justify-between text-xs transition-colors ${
                    active 
                      ? 'bg-stone-50 font-semibold text-charcoal' 
                      : 'text-warm-neutral hover:bg-stone-50/70 hover:text-charcoal'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <div 
                      className={`w-3.5 h-3.5 rounded-full border flex-shrink-0 ${t.previewDot}`}
                      style={{ backgroundColor: t.bgColor, borderColor: t.accentColor }}
                    />
                    <div className="flex flex-col">
                      <span className="font-sans text-xs leading-none">{t.name}</span>
                      <span className="text-[9px] text-warm-neutral mt-0.5">{t.description}</span>
                    </div>
                  </div>

                  {active && (
                    <Check className="w-3.5 h-3.5 text-botanical flex-shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
