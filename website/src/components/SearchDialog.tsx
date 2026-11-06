import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchDocs, type SearchResult } from '../lib/search';
import { Icon } from './Icon';

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchDialog: React.FC<SearchDialogProps> = ({ isOpen, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      if (dialog.open) {
        dialog.close();
      }
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleBackdrop = (e: MouseEvent) => {
      if (e.target === dialog) {
        onClose();
      }
    };

    dialog.addEventListener('click', handleBackdrop);
    return () => dialog.removeEventListener('click', handleBackdrop);
  }, [onClose]);

  useEffect(() => {
    let active = true;
    if (!query.trim()) {
      setResults([]);
      setSelectedIndex(0);
      return;
    }

    searchDocs(query).then((res) => {
      if (active) {
        setResults(res);
        setSelectedIndex(0);
      }
    });

    return () => {
      active = false;
    };
  }, [query]);

  const handleSelect = (result: SearchResult) => {
    onClose();
    navigate(result.path);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (results.length > 0 ? (prev + 1) % results.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        results.length > 0 ? (prev - 1 + results.length) % results.length : 0
      );
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault();
      handleSelect(results[selectedIndex]);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onCancel={onClose}
      className="backdrop:bg-surface-elevated/70 fixed inset-0 m-auto w-full max-w-xl rounded-xl border border-border bg-surface p-0 shadow-lg"
      aria-label="Documentation search"
    >
      <div className="flex items-center border-b border-border px-4 py-3">
        <Icon name="search" className="text-text-muted mr-3 text-xl" aria-hidden={true} />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search documentation (titles, headings, text)..."
          className="text-text placeholder:text-text-subtle w-full bg-transparent text-base outline-none"
          aria-label="Search documentation"
        />
        <button
          type="button"
          onClick={onClose}
          className="text-text-muted hover:text-text rounded-md p-1"
          aria-label="Close search"
        >
          <Icon name="close" aria-hidden={true} />
        </button>
      </div>

      <div className="max-h-96 overflow-y-auto p-2">
        {query.trim() === '' ? (
          <div className="text-text-muted px-4 py-8 text-center text-sm">
            Type to search titles, sections, or keywords across the documentation.
          </div>
        ) : results.length === 0 ? (
          <div className="text-text-muted px-4 py-8 text-center text-sm">
            No matching documentation found for &quot;{query}&quot;.
          </div>
        ) : (
          <ul role="listbox" aria-label="Search results" className="space-y-1">
            {results.map((result, index) => {
              const isSelected = index === selectedIndex;
              return (
                <li key={result.id} role="presentation">
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(result)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full text-left rounded-lg px-3 py-2 transition-colors ${
                      isSelected
                        ? 'bg-accent-subtle text-accent-fg'
                        : 'hover:bg-surface-hover text-text'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-text-muted">
                      <span>{result.group}</span>
                      <span className="font-normal opacity-80">{result.docTitle}</span>
                    </div>
                    <div className="mt-1 flex items-center font-medium">
                      <Icon name="article" className="mr-1.5 text-base opacity-70" aria-hidden={true} />
                      <span>{result.heading}</span>
                    </div>
                    {result.content && (
                      <p className="mt-1 line-clamp-1 text-xs text-text-muted">{result.content}</p>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="border-t border-border px-4 py-2 text-right text-xs text-text-muted">
        <span className="mr-3">
          <kbd className="rounded border border-border bg-surface-subtle px-1.5 py-0.5">↑</kbd>{' '}
          <kbd className="rounded border border-border bg-surface-subtle px-1.5 py-0.5">↓</kbd> to navigate
        </span>
        <span className="mr-3">
          <kbd className="rounded border border-border bg-surface-subtle px-1.5 py-0.5">↵</kbd> to select
        </span>
        <span>
          <kbd className="rounded border border-border bg-surface-subtle px-1.5 py-0.5">esc</kbd> to close
        </span>
      </div>
    </dialog>
  );
};
