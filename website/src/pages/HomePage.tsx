import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { useReducedMotion } from '../lib/use-reduced-motion';
import { animateButtonScale } from '../lib/motion';

export const HomePage: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const getStartedBtnRef = useRef<HTMLAnchorElement>(null);
  const downloadBtnRef = useRef<HTMLAnchorElement>(null);

  const handleMouseEnter = (ref: React.RefObject<HTMLAnchorElement | null>) => {
    animateButtonScale(ref.current, 1.03, reducedMotion);
  };

  const handleMouseLeave = (ref: React.RefObject<HTMLAnchorElement | null>) => {
    animateButtonScale(ref.current, 1, reducedMotion);
  };

  const handleMouseDown = (ref: React.RefObject<HTMLAnchorElement | null>) => {
    animateButtonScale(ref.current, 0.97, reducedMotion);
  };

  const handleMouseUp = (ref: React.RefObject<HTMLAnchorElement | null>) => {
    animateButtonScale(ref.current, 1.03, reducedMotion);
  };

  return (
    <div className="relative overflow-hidden py-16 sm:py-24">
      {/* Sleek subtle gradient background accent */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-accent-subtle opacity-40 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-subtle px-3 py-1 text-xs font-semibold text-text-muted">
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span>Hobby Minecraft Launcher</span>
        </div>

        {/* Hero Title */}
        <h1 className="font-heading mt-6 text-4xl font-extrabold tracking-tight text-text-strong sm:text-6xl">
          Documentation for{' '}
          <span className="bg-gradient-to-r from-accent to-accent-hover bg-clip-text text-transparent">
            StrataLauncher
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="mx-auto mt-6 max-w-2xl text-lg text-text-muted">
          A modern, lightweight desktop launcher built for Minecraft: Java Edition. Explore guides, server
          networking instructions, instance configuration, and technical reference.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            ref={getStartedBtnRef}
            to="/docs/getting-started/introduction"
            onMouseEnter={() => handleMouseEnter(getStartedBtnRef)}
            onMouseLeave={() => handleMouseLeave(getStartedBtnRef)}
            onMouseDown={() => handleMouseDown(getStartedBtnRef)}
            onMouseUp={() => handleMouseUp(getStartedBtnRef)}
            className="flex items-center gap-2 rounded-xl border border-accent bg-accent px-6 py-3 font-semibold text-text-strong shadow-md transition-shadow hover:shadow-lg no-underline"
          >
            <span>Explore Documentation</span>
            <Icon name="arrow_forward" className="text-lg" aria-hidden={true} />
          </Link>

          <Link
            ref={downloadBtnRef}
            to="/downloads"
            onMouseEnter={() => handleMouseEnter(downloadBtnRef)}
            onMouseLeave={() => handleMouseLeave(downloadBtnRef)}
            onMouseDown={() => handleMouseDown(downloadBtnRef)}
            onMouseUp={() => handleMouseUp(downloadBtnRef)}
            className="flex items-center gap-2 rounded-xl border border-border bg-surface px-6 py-3 font-semibold text-text shadow-sm hover:border-border-strong hover:bg-surface-hover no-underline"
          >
            <Icon name="download" className="text-lg text-text-muted" aria-hidden={true} />
            <span>Downloads</span>
          </Link>
        </div>

        {/* Placeholder cards */}
        <div className="mt-20 grid grid-cols-1 gap-6 text-left sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-surface-subtle p-6 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-accent/30 bg-accent-subtle text-accent-fg">
              <Icon name="rocket_launch" aria-hidden={true} />
            </div>
            <h3 className="font-heading mt-4 text-base font-bold text-text-strong">Getting Started</h3>
            <p className="mt-2 text-sm text-text-muted">
              Learn how to install, configure authentication, and launch your first instance.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface-subtle p-6 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-accent/30 bg-accent-subtle text-accent-fg">
              <Icon name="dns" aria-hidden={true} />
            </div>
            <h3 className="font-heading mt-4 text-base font-bold text-text-strong">Servers & Network</h3>
            <p className="mt-2 text-sm text-text-muted">
              Setup LAN hosting, understand firewall ports, and maintain server connection security.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface-subtle p-6 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-accent/30 bg-accent-subtle text-accent-fg">
              <Icon name="code_blocks" aria-hidden={true} />
            </div>
            <h3 className="font-heading mt-4 text-base font-bold text-text-strong">Configuration Demo</h3>
            <p className="mt-2 text-sm text-text-muted">
              Reference code block highlighting, markdown tables, callout notes, and syntax options.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
