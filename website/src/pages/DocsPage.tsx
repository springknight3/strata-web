import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDoc, getPrevNextDocs, type DocModule } from '../lib/docs';
import { TableOfContents } from '../components/TableOfContents';
import { PrevNext } from '../components/PrevNext';
import { mdxComponents } from '../components/MDXComponents';
import { Icon } from '../components/Icon';

export const DocsPage: React.FC = () => {
  const { group = '', slug = '' } = useParams<{ group: string; slug: string }>();
  const [module, setModule] = useState<DocModule | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const doc = useMemo(() => getDoc(group, slug), [group, slug]);
  const prevNext = useMemo(
    () => (doc ? getPrevNextDocs(doc.path) : { prev: null, next: null }),
    [doc]
  );

  useEffect(() => {
    if (!doc) {
      setLoading(false);
      setError('Document not found');
      return;
    }

    setLoading(true);
    setError(null);

    doc
      .load()
      .then((mod) => {
        setModule(mod);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load doc component', err);
        setError('Failed to load document content');
        setLoading(false);
      });
  }, [doc]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-text-muted">
        <Icon name="progress_activity" className="animate-spin text-2xl mr-2" aria-hidden={true} />
        <span>Loading documentation...</span>
      </div>
    );
  }

  if (error || !doc || !module) {
    return (
      <div className="py-12 text-center">
        <h2 className="font-heading text-2xl font-bold text-text-strong">Document Not Found</h2>
        <p className="mt-2 text-text-muted">
          The requested documentation page could not be located.
        </p>
        <Link
          to="/docs"
          className="mt-6 inline-flex items-center gap-2 rounded-lg border border-accent bg-accent px-4 py-2 font-semibold text-text-strong no-underline"
        >
          <Icon name="arrow_back" aria-hidden={true} />
          <span>Back to Documentation</span>
        </Link>
      </div>
    );
  }

  const MDXContent = module.default;
  const toc = module.tableOfContents || [];

  return (
    <div className="flex w-full gap-8">
      {/* Main Prose Article */}
      <article className="min-w-0 flex-1">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-xs text-text-muted">
          <Link to="/docs" className="hover:text-text no-underline">
            Docs
          </Link>
          <Icon name="chevron_right" className="text-sm opacity-50" aria-hidden={true} />
          <span className="capitalize">{doc.groupTitle}</span>
          <Icon name="chevron_right" className="text-sm opacity-50" aria-hidden={true} />
          <span className="font-medium text-text">{doc.title}</span>
        </nav>

        {/* Title */}
        <header className="mb-8 border-b border-border pb-6">
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-text-strong sm:text-4xl">
            {doc.title}
          </h1>
          {doc.description && (
            <p className="mt-3 text-lg text-text-muted">{doc.description}</p>
          )}
        </header>

        {/* Rendered MDX Content */}
        <div className="prose prose-slate max-w-none text-text">
          <MDXContent components={mdxComponents} />
        </div>

        {/* Previous / Next Navigation */}
        <PrevNext prev={prevNext.prev} next={prevNext.next} />
      </article>

      {/* Right-hand TOC */}
      <TableOfContents toc={toc} />
    </div>
  );
};
