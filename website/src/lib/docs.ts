import type { ComponentType } from 'react';
import manifestData from './docs-manifest.json';

export interface DocFrontmatter {
  title: string;
  group: string;
  order: number;
  description?: string;
}

export interface TocItem {
  value: string;
  depth: number;
  id?: string;
  children?: TocItem[];
}

export interface DocModule {
  default: ComponentType<{ components?: Record<string, unknown> }>;
  frontmatter: DocFrontmatter;
  tableOfContents?: TocItem[];
}

export interface DocItem {
  id: string; // "getting-started/introduction"
  group: string; // "getting-started"
  groupTitle: string; // "Getting Started"
  slug: string; // "introduction"
  title: string;
  order: number;
  description?: string;
  path: string; // "/docs/getting-started/introduction"
  filePath: string;
  load: () => Promise<DocModule>;
}

// MDX pages are dynamically imported / lazy-loaded
const docLoaders = import.meta.glob<DocModule>('/src/content/**/*.mdx');

interface ManifestEntry {
  id: string;
  group: string;
  groupTitle: string;
  slug: string;
  title: string;
  order: number;
  description?: string;
  path: string;
  filePath: string;
}

const manifestEntries: ManifestEntry[] = manifestData as ManifestEntry[];

export function getAllDocs(): DocItem[] {
  return manifestEntries.map((entry) => ({
    ...entry,
    load: docLoaders[entry.filePath] || (() => Promise.reject(new Error(`Loader not found for ${entry.filePath}`))),
  }));
}

export function getFirstDoc(): DocItem | null {
  const docs = getAllDocs();
  return docs.length > 0 ? docs[0] : null;
}

export function getDoc(group: string, slug: string): DocItem | undefined {
  const targetId = `${group}/${slug}`;
  return getAllDocs().find((doc) => doc.id === targetId);
}

export function getPrevNextDocs(currentPath: string): { prev: DocItem | null; next: DocItem | null } {
  const docs = getAllDocs();
  const currentIndex = docs.findIndex((doc) => doc.path === currentPath);
  if (currentIndex === -1) {
    return { prev: null, next: null };
  }
  return {
    prev: currentIndex > 0 ? docs[currentIndex - 1] : null,
    next: currentIndex < docs.length - 1 ? docs[currentIndex + 1] : null,
  };
}

export function getDocsGrouped(): Record<string, { groupTitle: string; items: DocItem[] }> {
  const docs = getAllDocs();
  const groups: Record<string, { groupTitle: string; items: DocItem[] }> = {};

  for (const doc of docs) {
    if (!groups[doc.group]) {
      groups[doc.group] = {
        groupTitle: doc.groupTitle,
        items: [],
      };
    }
    groups[doc.group].items.push(doc);
  }

  return groups;
}
