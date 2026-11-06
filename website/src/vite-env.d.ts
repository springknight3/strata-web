/// <reference types="vite/client" />

declare module '*.mdx' {
  import type { ComponentType } from 'react';
  import type { Toc } from '@stefanprobst/rehype-extract-toc';

  export interface DocFrontmatter {
    title: string;
    group: string;
    order: number;
    description?: string;
  }

  export const frontmatter: DocFrontmatter;
  export const tableOfContents: Toc;
  const MDXComponent: ComponentType<{ components?: Record<string, unknown> }>;
  export default MDXComponent;
}
