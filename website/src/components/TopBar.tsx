import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from './Icon';
import { useReducedMotion } from '../lib/use-reduced-motion';
import { animateButtonScale } from '../lib/motion';

interface TopBarProps {
  onOpenSearch: () => void;
  onToggleMobileMenu: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onOpenSearch, onToggleMobileMenu }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const reducedMotion = useReducedMotion();
  const searchBtnRef = useRef<HTMLButtonElement>(null);
  const themeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const isDark =
      document.documentElement.getAttribute('data-theme') === 'dark' ||
      document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('strata-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleMouseEnter = (ref: React.RefObject<HTMLButtonElement | null>) => {
    animateButtonScale(ref.current, 1.05, reducedMotion);
  };

  const handleMouseLeave = (ref: React.RefObject<HTMLButtonElement | null>) => {
    animateButtonScale(ref.current, 1, reducedMotion);
  };

  const handleMouseDown = (ref: React.RefObject<HTMLButtonElement | null>) => {
    animateButtonScale(ref.current, 0.96, reducedMotion);
  };

  const handleMouseUp = (ref: React.RefObject<HTMLButtonElement | null>) => {
    animateButtonScale(ref.current, 1.05, reducedMotion);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface-elevated/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Hamburger menu (mobile) & Brand */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleMobileMenu}
            className="text-text-muted hover:text-text rounded-lg p-1.5 lg:hidden"
            aria-label="Toggle navigation menu"
          >
            <Icon name="menu" aria-hidden={true} />
          </button>

          <Link to="/" className="flex items-center gap-2.5 no-underline">
            {/* Logo placeholder */}
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent/40 bg-accent-subtle font-mono text-sm font-bold text-accent-fg"
              aria-hidden="true"
            >
              SL
            </div>
            <span className="font-heading text-lg font-bold tracking-tight text-text-strong">
              StrataLauncher
            </span>
            <span className="hidden rounded-full border border-border bg-surface-subtle px-2 py-0.5 text-xs font-medium text-text-muted sm:inline-block">
              Docs
            </span>
          </Link>
        </div>

        {/* Center / Right: Nav links, Search button, Theme Toggle, GitHub */}
        <div className="flex items-center gap-2 sm:gap-3">
          <nav className="hidden items-center gap-4 text-sm font-medium md:flex">
            <Link
              to="/docs"
              className="text-text-muted hover:text-text transition-colors no-underline"
            >
              Documentation
            </Link>
            <Link
              to="/downloads"
              className="text-text-muted hover:text-text transition-colors no-underline"
            >
              Downloads
            </Link>
            <Link
              to="/licenses"
              className="text-text-muted hover:text-text transition-colors no-underline"
            >
              Licenses
            </Link>
          </nav>

          {/* Search Trigger Button */}
          <button
            ref={searchBtnRef}
            type="button"
            onClick={onOpenSearch}
            onMouseEnter={() => handleMouseEnter(searchBtnRef)}
            onMouseLeave={() => handleMouseLeave(searchBtnRef)}
            onMouseDown={() => handleMouseDown(searchBtnRef)}
            onMouseUp={() => handleMouseUp(searchBtnRef)}
            className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs text-text-muted shadow-sm hover:border-border-strong hover:text-text sm:w-48 sm:justify-between"
            aria-label="Search documentation (Press Ctrl+K or Cmd+K)"
          >
            <span className="flex items-center gap-1.5">
              <Icon name="search" className="text-base" aria-hidden={true} />
              <span className="hidden sm:inline">Search docs...</span>
              <span className="sm:hidden">Search</span>
            </span>
            <kbd className="hidden rounded border border-border bg-surface-subtle px-1.5 py-0.5 text-[10px] font-mono sm:inline-block">
              Ctrl K
            </kbd>
          </button>

          {/* Theme Toggle Button */}
          <button
            ref={themeBtnRef}
            type="button"
            onClick={toggleTheme}
            onMouseEnter={() => handleMouseEnter(themeBtnRef)}
            onMouseLeave={() => handleMouseLeave(themeBtnRef)}
            onMouseDown={() => handleMouseDown(themeBtnRef)}
            onMouseUp={() => handleMouseUp(themeBtnRef)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface text-text-muted hover:border-border-strong hover:text-text"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <Icon name={theme === 'dark' ? 'light_mode' : 'dark_mode'} aria-hidden={true} />
          </button>

          {/* GitHub link placeholder */}
          <a
            href="https://github.com/placeholder/stratalauncher"
            target="_blank"
            rel="noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface text-text-muted hover:border-border-strong hover:text-text no-underline"
            aria-label="GitHub repository placeholder"
          >
            <Icon name="code" aria-hidden={true} />
          </a>
        </div>
      </div>
    </header>
  );
};
