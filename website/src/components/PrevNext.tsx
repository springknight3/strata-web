import React from 'react';
import { Link } from 'react-router-dom';
import type { DocItem } from '../lib/docs';
import { Icon } from './Icon';

interface PrevNextProps {
  prev: DocItem | null;
  next: DocItem | null;
}

export const PrevNext: React.FC<PrevNextProps> = ({ prev, next }) => {
  if (!prev && !next) return null;

  return (
    <nav
      className="mt-12 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between"
      aria-label="Previous and Next document"
    >
      {prev ? (
        <Link
          to={prev.path}
          className="group flex flex-col rounded-lg border border-border p-3 transition-colors hover:border-accent hover:bg-surface-hover no-underline sm:max-w-[48%]"
        >
          <span className="flex items-center gap-1 text-xs text-text-muted group-hover:text-accent">
            <Icon name="arrow_back" className="text-sm" aria-hidden={true} />
            <span>Previous</span>
          </span>
          <span className="mt-1 text-sm font-semibold text-text group-hover:text-accent">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          to={next.path}
          className="group flex flex-col items-end rounded-lg border border-border p-3 transition-colors hover:border-accent hover:bg-surface-hover no-underline sm:max-w-[48%]"
        >
          <span className="flex items-center gap-1 text-xs text-text-muted group-hover:text-accent">
            <span>Next</span>
            <Icon name="arrow_forward" className="text-sm" aria-hidden={true} />
          </span>
          <span className="mt-1 text-sm font-semibold text-text group-hover:text-accent">
            {next.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
};
