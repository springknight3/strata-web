import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { getDocsGrouped } from '../lib/docs';
import { Icon } from './Icon';
import { useReducedMotion } from '../lib/use-reduced-motion';
import { animateSidebarItems } from '../lib/motion';

interface SidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onCloseMobile }) => {
  const groups = getDocsGrouped();
  const reducedMotion = useReducedMotion();
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!hasAnimatedRef.current && itemRefs.current.length > 0) {
      animateSidebarItems(itemRefs.current, reducedMotion);
      hasAnimatedRef.current = true;
    }
  }, [reducedMotion]);

  const navContent = (
    <nav className="space-y-6 px-4 py-6" aria-label="Documentation navigation">
      {Object.entries(groups).map(([groupKey, group]) => (
        <div key={groupKey}>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
            {group.groupTitle}
          </h3>
          <ul className="space-y-1">
            {group.items.map((doc) => (
              <li key={doc.id}>
                <NavLink
                  to={doc.path}
                  ref={(el) => {
                    if (el && !itemRefs.current.includes(el)) {
                      itemRefs.current.push(el);
                    }
                  }}
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors no-underline ${
                      isActive
                        ? 'bg-accent-subtle font-semibold text-accent-fg'
                        : 'text-text-muted hover:bg-surface-hover hover:text-text'
                    }`
                  }
                >
                  <Icon name="description" className="text-base opacity-60" aria-hidden={true} />
                  <span>{doc.title}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );

  return (
    <>
      {/* Desktop static left sidebar */}
      <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 overflow-y-auto border-r border-border bg-surface-subtle lg:block">
        {navContent}
      </aside>

      {/* Mobile drawer backdrop and panel */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden" role="dialog" aria-modal="true">
          <div
            className="fixed inset-0 bg-surface-elevated/70 backdrop-blur-sm"
            onClick={onCloseMobile}
            aria-hidden="true"
          />
          <aside className="relative flex w-4/5 max-w-xs flex-col border-r border-border bg-surface shadow-lg">
            <div className="flex h-14 items-center justify-between border-b border-border px-4">
              <span className="font-heading font-bold text-text-strong">Navigation</span>
              <button
                type="button"
                onClick={onCloseMobile}
                className="text-text-muted hover:text-text rounded-md p-1"
                aria-label="Close navigation"
              >
                <Icon name="close" aria-hidden={true} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">{navContent}</div>
          </aside>
        </div>
      )}
    </>
  );
};
