import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const THEMES = [
  {
    id: 'light',
    name: 'Classic Light',
    description: 'Ivory Linen & Botanical Garden',
    icon: 'Sun',
    accentColor: '#1B3B2B',
    bgColor: '#FAFAF9',
    previewDot: 'bg-[#FAFAF9] border-stone-300'
  },
  {
    id: 'dark',
    name: 'Midnight Noir',
    description: 'Obsidian Slate & Radiant Contrast',
    icon: 'Moon',
    accentColor: '#34D399',
    bgColor: '#0F1110',
    previewDot: 'bg-[#0F1110] border-neutral-700'
  },
  {
    id: 'emerald',
    name: 'Botanical Emerald',
    description: 'Velvet Forest & Sage Gold Luxury',
    icon: 'Leaf',
    accentColor: '#E9C46A',
    bgColor: '#091912',
    previewDot: 'bg-[#091912] border-emerald-800'
  }
];

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('bloom_theme');
    if (saved && (saved === 'light' || saved === 'dark' || saved === 'emerald')) {
      return saved;
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('bloom_theme', theme);
  }, [theme]);

  const cycleTheme = () => {
    setTheme(current => {
      if (current === 'light') return 'dark';
      if (current === 'dark') return 'emerald';
      return 'light';
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme, THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
