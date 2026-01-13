import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}

const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const applyTheme = (theme: Theme) => {
  const root = window.document.documentElement;
  const resolvedTheme = theme === 'system' ? getSystemTheme() : theme;
  
  root.classList.remove('light', 'dark');
  root.classList.add(resolvedTheme);
  
  return resolvedTheme;
};

export const useTheme = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'system',
      resolvedTheme: 'light',
      setTheme: (theme) => {
        const resolvedTheme = applyTheme(theme);
        set({ theme, resolvedTheme });
      },
    }),
    {
      name: 'manhaj-theme',
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyTheme(state.theme);
        }
      },
    }
  )
);

// Initialize theme on load
if (typeof window !== 'undefined') {
  const stored = localStorage.getItem('manhaj-theme');
  if (stored) {
    try {
      const { state } = JSON.parse(stored);
      applyTheme(state.theme);
    } catch {
      applyTheme('system');
    }
  } else {
    applyTheme('system');
  }

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const currentTheme = useTheme.getState().theme;
    if (currentTheme === 'system') {
      applyTheme('system');
    }
  });
}
