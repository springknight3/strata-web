import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';

export const DownloadsPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl py-12 px-4 sm:px-6">
      <header className="border-b border-border pb-6">
        <h1 className="font-heading text-3xl font-extrabold tracking-tight text-text-strong sm:text-4xl">
          Downloads
        </h1>
        <p className="mt-3 text-lg text-text-muted">
          Download builds of StrataLauncher for Linux, Windows, and macOS.
        </p>
      </header>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-surface-subtle p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-text">
            <Icon name="terminal" aria-hidden={true} />
          </div>
          <h3 className="font-heading mt-4 text-base font-bold text-text-strong">Linux</h3>
          <p className="mt-1 text-xs text-text-muted">Wayland native & X11 (tar.gz / AppImage)</p>
          <button
            type="button"
            disabled
            className="mt-6 w-full cursor-not-allowed rounded-lg border border-border bg-surface px-4 py-2 text-xs font-semibold text-text-muted opacity-60"
          >
            Coming Soon (Placeholder)
          </button>
        </div>

        <div className="rounded-xl border border-border bg-surface-subtle p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-text">
            <Icon name="window" aria-hidden={true} />
          </div>
          <h3 className="font-heading mt-4 text-base font-bold text-text-strong">Windows</h3>
          <p className="mt-1 text-xs text-text-muted">Windows 10 / 11 (x64 Installer)</p>
          <button
            type="button"
            disabled
            className="mt-6 w-full cursor-not-allowed rounded-lg border border-border bg-surface px-4 py-2 text-xs font-semibold text-text-muted opacity-60"
          >
            Coming Soon (Placeholder)
          </button>
        </div>

        <div className="rounded-xl border border-border bg-surface-subtle p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-text">
            <Icon name="laptop_mac" aria-hidden={true} />
          </div>
          <h3 className="font-heading mt-4 text-base font-bold text-text-strong">macOS</h3>
          <p className="mt-1 text-xs text-text-muted">Apple Silicon & Intel (DMG)</p>
          <button
            type="button"
            disabled
            className="mt-6 w-full cursor-not-allowed rounded-lg border border-border bg-surface px-4 py-2 text-xs font-semibold text-text-muted opacity-60"
          >
            Coming Soon (Placeholder)
          </button>
        </div>
      </div>

      <div className="mt-12">
        <Link
          to="/docs"
          className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover no-underline"
        >
          <Icon name="arrow_back" aria-hidden={true} />
          <span>Return to Documentation</span>
        </Link>
      </div>
    </div>
  );
};
