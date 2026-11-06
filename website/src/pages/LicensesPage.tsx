import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';

export const LicensesPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl py-12 px-4 sm:px-6">
      <header className="border-b border-border pb-6">
        <h1 className="font-heading text-3xl font-extrabold tracking-tight text-text-strong sm:text-4xl">
          Licenses & Disclaimers
        </h1>
        <p className="mt-3 text-lg text-text-muted">
          Open-source licenses and third-party notices for StrataLauncher.
        </p>
      </header>

      <div className="mt-8 space-y-6">
        <section className="rounded-xl border border-border bg-surface-subtle p-6">
          <h2 className="font-heading text-lg font-bold text-text-strong">
            StrataLauncher License (GPLv3 / Placeholder)
          </h2>
          <p className="mt-2 text-sm text-text-muted">
            StrataLauncher is free and open-source software created as a community hobby project.
          </p>
        </section>

        <section className="rounded-xl border border-border bg-surface-subtle p-6">
          <h2 className="font-heading text-lg font-bold text-text-strong">Mojang Studios Disclaimer</h2>
          <p className="mt-2 text-sm text-text-muted">
            NOT AN OFFICIAL MINECRAFT PRODUCT. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT.
            Minecraft is copyright &copy; Mojang AB. StrataLauncher does not distribute game binaries or
            infringe on proprietary assets.
          </p>
        </section>

        <section className="rounded-xl border border-border bg-surface-subtle p-6">
          <h2 className="font-heading text-lg font-bold text-text-strong">Third-Party Assets</h2>
          <ul className="mt-2 list-disc pl-5 text-sm text-text-muted space-y-1">
            <li>DM Sans Font - SIL Open Font License 1.1</li>
            <li>Outfit Font - SIL Open Font License 1.1</li>
            <li>JetBrains Mono Font - SIL Open Font License 1.1</li>
            <li>Material Symbols Rounded - Apache License 2.0</li>
          </ul>
        </section>
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
