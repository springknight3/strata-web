import React, { useEffect, useState } from 'react';
import type { TocItem } from '../lib/docs';
import { Icon } from './Icon';

interface TableOfContentsProps {
  toc: TocItem[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ toc }) => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (!toc || toc.length === 0) return;

    const headingElements = Array.from(
      document.querySelectorAll<HTMLElement>('article h2, article h3')
    );

    if (headingElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: '0px 0px -70% 0px',
        threshold: 0.1,
      }
    );

    headingElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [toc]);

  if (!toc || toc.length === 0) {
    return null;
  }

  const renderItems = (items: TocItem[]) => (
    <ul className="space-y-1.5 text-xs">
      {items.map((item) => {
        const id = item.id || '';
        const isActive = activeId === id;
        return (
          <li
            key={id || item.value}
            className={`${item.depth > 2 ? 'ml-3' : ''}`}
          >
            <a
              href={`#${id}`}
              className={`block rounded py-1 transition-colors no-underline ${
                isActive
                  ? 'font-semibold text-accent'
                  : 'text-text-muted hover:text-text'
              }`}
            >
              {item.value}
            </a>
            {item.children && item.children.length > 0 && renderItems(item.children)}
          </li>
        );
      })}
    </ul>
  );

  return (
    <aside
      className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-60 shrink-0 overflow-y-auto px-4 py-8 xl:block"
      aria-label="Table of contents"
    >
      <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-text-muted">
        <Icon name="format_list_bulleted" className="text-sm" aria-hidden={true} />
        <span>On this page</span>
      </div>
      <div className="mt-3">{renderItems(toc)}</div>
    </aside>
  );
};
