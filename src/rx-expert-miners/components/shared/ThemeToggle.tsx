import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LIGHT_TOKENS: Record<string, string> = {
  '--popover': '0 0% 100%',
  '--popover-foreground': '240 10% 4%',
  '--background': '0 0% 100%',
  '--foreground': '240 10% 4%',
  '--card': '0 0% 98%',
  '--card-foreground': '240 10% 4%',
  '--muted': '240 5% 92%',
  '--muted-foreground': '240 5% 45%',
  '--border': '240 5% 84%',
  '--input': '240 5% 84%',
};

const DARK_TOKENS: Record<string, string> = {
  '--popover': '240 8% 11%',
  '--popover-foreground': '40 20% 96%',
  '--background': '240 10% 6%',
  '--foreground': '40 20% 96%',
  '--card': '240 8% 9%',
  '--card-foreground': '40 20% 96%',
  '--muted': '240 6% 15%',
  '--muted-foreground': '240 5% 65%',
  '--border': '240 6% 18%',
  '--input': '240 6% 18%',
};

export function applyRxTokens(dark: boolean) {
  const tokens = dark ? DARK_TOKENS : LIGHT_TOKENS;
  const root = document.documentElement;
  Object.entries(tokens).forEach(([k, v]) => root.style.setProperty(k, v));
}

const ThemeToggle = () => {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('rx-theme');
    return stored ? stored === 'dark' : true;
  });

  useEffect(() => {
    const wrapper = document.querySelector('.data-bridge-app');
    if (wrapper) wrapper.classList.toggle('dark', dark);
    localStorage.setItem('rx-theme', dark ? 'dark' : 'light');
    applyRxTokens(dark);
  }, [dark]);

  return (
    <Button variant="outline" size="icon" onClick={() => setDark(d => !d)} aria-label="Toggle theme">
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
};

export default ThemeToggle;
