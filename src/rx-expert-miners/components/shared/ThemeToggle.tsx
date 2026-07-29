import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Toggles the .dark class on the .data-bridge-app wrapper. That's all that's
 * needed — index.css already defines the full light theme under
 * .data-bridge-app and the full dark theme under .data-bridge-app.dark, so
 * the class toggle alone switches every color correctly via the cascade.
 *
 * NOTE: an earlier version of this also wrote theme variables directly onto
 * document.documentElement via inline styles (applyRxTokens). That's been
 * removed — inline styles on <html> beat every stylesheet rule, including
 * the marketing site's own `:root { --border: ... }`, so visiting /admin
 * once would silently corrupt the marketing site's border color the next
 * time you navigated back to `/` without a full page reload.
 */
const ThemeToggle = () => {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('rx-theme');
    return stored ? stored === 'dark' : true;
  });

  useEffect(() => {
    const wrapper = document.querySelector('.data-bridge-app');
    if (wrapper) wrapper.classList.toggle('dark', dark);
    localStorage.setItem('rx-theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <Button variant="outline" size="icon" onClick={() => setDark((d) => !d)} aria-label="Toggle theme">
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
};

export default ThemeToggle;
