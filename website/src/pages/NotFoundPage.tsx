import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-2xl py-24 px-4 text-center sm:px-6">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-surface-subtle text-accent">
        <Icon name="search_off" className="text-3xl" aria-hidden={true} />
      </div>
      <h1 className="font-heading mt-6 text-4xl font-extrabold tracking-tight text-text-strong">
        404 - Page Not Found
      </h1>
      <p className="mt-3 text-base text-text-muted">
        The page you are looking for doesn&apos;t exist or has moved.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl border border-accent bg-accent px-5 py-2.5 font-semibold text-text-strong shadow-sm no-underline"
        >
          <Icon name="home" aria-hidden={true} />
          <span>Go Home</span>
        </Link>
        <Link
          to="/docs"
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-5 py-2.5 font-semibold text-text shadow-sm hover:border-border-strong no-underline"
        >
          <Icon name="menu_book" aria-hidden={true} />
          <span>Documentation</span>
        </Link>
      </div>
    </div>
  );
};
