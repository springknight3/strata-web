import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from './Icon';

interface CalloutProps {
  children: React.ReactNode;
  title?: string;
}

export const Note: React.FC<CalloutProps> = ({ children, title = 'Note' }) => {
  return (
    <aside
      className="my-6 flex gap-3.5 rounded-xl border border-callout-note-border bg-callout-note-bg p-4 text-sm text-callout-note-text"
      role="note"
      aria-label={title}
    >
      <Icon name="info" className="shrink-0 text-xl text-callout-note-text" aria-hidden={true} />
      <div className="flex-1 space-y-1">
        {title && <div className="font-semibold text-callout-note-text">{title}</div>}
        <div className="text-callout-note-text opacity-95">{children}</div>
      </div>
    </aside>
  );
};

export const Tip: React.FC<CalloutProps> = ({ children, title = 'Tip' }) => {
  return (
    <aside
      className="my-6 flex gap-3.5 rounded-xl border border-callout-tip-border bg-callout-tip-bg p-4 text-sm text-callout-tip-text"
      role="note"
      aria-label={title}
    >
      <Icon name="lightbulb" className="shrink-0 text-xl text-callout-tip-text" aria-hidden={true} />
      <div className="flex-1 space-y-1">
        {title && <div className="font-semibold text-callout-tip-text">{title}</div>}
        <div className="text-callout-tip-text opacity-95">{children}</div>
      </div>
    </aside>
  );
};

export const Warning: React.FC<CalloutProps> = ({ children, title = 'Warning' }) => {
  return (
    <aside
      className="my-6 flex gap-3.5 rounded-xl border border-callout-warning-border bg-callout-warning-bg p-4 text-sm text-callout-warning-text"
      role="alert"
      aria-label={title}
    >
      <Icon name="warning" className="shrink-0 text-xl text-callout-warning-text" aria-hidden={true} />
      <div className="flex-1 space-y-1">
        {title && <div className="font-semibold text-callout-warning-text">{title}</div>}
        <div className="text-callout-warning-text opacity-95">{children}</div>
      </div>
    </aside>
  );
};

interface PreProps extends React.HTMLAttributes<HTMLPreElement> {
  'data-language'?: string;
}

export const Pre: React.FC<PreProps> = ({ children, className = '', 'data-language': dataLang, ...props }) => {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  // Extract language from className or data-language
  const langMatch = className.match(/language-([a-z0-9_-]+)/i);
  const language = dataLang || (langMatch ? langMatch[1] : '');

  const handleCopy = async () => {
    if (!preRef.current) return;
    const text = preRef.current.innerText || '';
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code to clipboard', err);
    }
  };

  return (
    <div className="group relative my-6 rounded-xl border border-border bg-surface-subtle">
      {/* Top bar with language label and copy button */}
      <div className="flex items-center justify-between border-b border-border px-4 py-1.5 text-xs text-text-muted">
        <span className="font-mono font-medium lowercase tracking-wider opacity-80">
          {language || 'code'}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 rounded px-2 py-1 text-xs text-text-muted hover:bg-surface hover:text-text focus:outline-none"
          aria-label={copied ? 'Code copied to clipboard' : 'Copy code to clipboard'}
        >
          <Icon name={copied ? 'check' : 'content_copy'} className="text-sm" aria-hidden={true} />
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>

      <pre
        ref={preRef}
        className={`!my-0 !border-none !rounded-t-none overflow-x-auto p-4 font-mono text-sm leading-relaxed ${className}`}
        {...props}
      >
        {children}
      </pre>
    </div>
  );
};

export const CustomLink: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  href = '',
  children,
  ...props
}) => {
  const isInternal = href.startsWith('/') || href.startsWith('#');

  if (isInternal && !href.startsWith('#')) {
    return (
      <Link
        to={href}
        className="font-medium text-accent underline underline-offset-2 hover:text-accent-hover"
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer noopener' : undefined}
      className="font-medium text-accent underline underline-offset-2 hover:text-accent-hover"
      {...props}
    >
      {children}
    </a>
  );
};

export const Table: React.FC<React.TableHTMLAttributes<HTMLTableElement>> = (props) => (
  <div className="my-6 overflow-x-auto rounded-lg border border-border">
    <table className="w-full text-left text-sm text-text border-collapse" {...props} />
  </div>
);

export const Thead: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = (props) => (
  <thead className="border-b border-border bg-surface-subtle font-semibold text-text-strong" {...props} />
);

export const Th: React.FC<React.ThHTMLAttributes<HTMLTableCellElement>> = (props) => (
  <th className="px-4 py-3 font-semibold text-text-strong" {...props} />
);

export const Td: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>> = (props) => (
  <td className="border-t border-border px-4 py-3" {...props} />
);

export const Blockquote: React.FC<React.BlockquoteHTMLAttributes<HTMLQuoteElement>> = (props) => (
  <blockquote
    className="my-6 border-l-4 border-accent pl-4 italic text-text-muted"
    {...props}
  />
);

export const mdxComponents = {
  Note,
  Tip,
  Warning,
  pre: Pre,
  a: CustomLink,
  table: Table,
  thead: Thead,
  th: Th,
  td: Td,
  blockquote: Blockquote,
};
