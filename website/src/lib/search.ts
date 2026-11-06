import MiniSearch from 'minisearch';

export interface SearchResult {
  id: string;
  docTitle: string;
  heading: string;
  group: string;
  path: string;
  content: string;
  score: number;
}

let miniSearchInstance: MiniSearch | null = null;
let loadPromise: Promise<MiniSearch> | null = null;

export async function getSearchIndex(): Promise<MiniSearch> {
  if (miniSearchInstance) return miniSearchInstance;
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    const baseUrl = import.meta.env.BASE_URL || '/';
    const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    const response = await fetch(`${cleanBase}search-index.json`);
    if (!response.ok) {
      throw new Error(`Failed to load search index: ${response.statusText}`);
    }
    const json = await response.json();
    const instance = MiniSearch.loadJSON(JSON.stringify(json), {
      fields: ['docTitle', 'heading', 'content'],
      storeFields: ['id', 'docTitle', 'heading', 'group', 'path', 'content'],
      searchOptions: {
        boost: { heading: 3, docTitle: 2 },
        fuzzy: 0.2,
        prefix: true,
      },
    });
    miniSearchInstance = instance;
    return instance;
  })();

  return loadPromise;
}

export async function searchDocs(query: string): Promise<SearchResult[]> {
  if (!query.trim()) return [];
  const searchIndex = await getSearchIndex();
  const results = searchIndex.search(query, {
    boost: { heading: 3, docTitle: 2 },
    fuzzy: 0.2,
    prefix: true,
  });

  return results.slice(0, 10).map((res) => ({
    id: res.id as string,
    docTitle: (res.docTitle as string) || '',
    heading: (res.heading as string) || '',
    group: (res.group as string) || '',
    path: (res.path as string) || '',
    content: (res.content as string) || '',
    score: res.score,
  }));
}
