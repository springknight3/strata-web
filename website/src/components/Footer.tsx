import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border bg-surface-subtle py-8 text-center text-xs text-text-muted">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-2">
        <p className="max-w-2xl mx-auto leading-relaxed">
          This is a hobby project and not meant to replace anything! May contain security issues and flaws!
          Not affiliated with Mojang Studios, Microsoft, or any related entity. Minecraft is a registered
          trademark of Mojang Synergies AB.
        </p>
        <p className="opacity-75">
          &copy; {new Date().getFullYear()} StrataLauncher contributors. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
