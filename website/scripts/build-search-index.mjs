import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import MiniSearch from 'minisearch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const contentDir = path.join(rootDir, 'src', 'content');
const publicDir = path.join(rootDir, 'public');
const libDir = path.join(rootDir, 'src', 'lib');

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function formatGroupName(group) {
  return group
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return { frontmatter: {}, body: raw };
  const yaml = match[1];
  const body = raw.slice(match[0].length);
  const frontmatter = {};
  for (const line of yaml.split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (kv) {
      let val = kv[2].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      } else if (!isNaN(Number(val))) {
        val = Number(val);
      }
      frontmatter[kv[1]] = val;
    }
  }
  return { frontmatter, body };
}

function cleanMarkdown(text) {
  return text
    .replace(/```[\s\S]*?```/g, ' ') // code blocks
    .replace(/`([^`]+)`/g, '$1') // inline code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links
    .replace(/[#*_~>|-]/g, ' ') // markdown markers
    .replace(/<[^>]+>/g, ' ') // jsx/html tags
    .replace(/\s+/g, ' ')
    .trim();
}

function walkDir(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of list) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(walkDir(fullPath));
    } else if (entry.name.endsWith('.mdx')) {
      results.push(fullPath);
    }
  }
  return results;
}

function buildIndex() {
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  if (!fs.existsSync(libDir)) {
    fs.mkdirSync(libDir, { recursive: true });
  }

  const files = walkDir(contentDir);
  const documents = [];
  const manifest = [];

  for (const file of files) {
    const relative = path.relative(contentDir, file).replace(/\\/g, '/');
    const match = relative.match(/^([^/]+)\/([^/]+)\.mdx$/);
    if (!match) continue;
    const [, group, slug] = match;

    const raw = fs.readFileSync(file, 'utf8');
    const { frontmatter, body } = parseFrontmatter(raw);
    const title = frontmatter.title || slug;
    const order = typeof frontmatter.order === 'number' ? frontmatter.order : 999;
    const description = frontmatter.description || '';
    const docPath = `/docs/${group}/${slug}`;
    const filePath = `/src/content/${group}/${slug}.mdx`;

    manifest.push({
      id: `${group}/${slug}`,
      group,
      groupTitle: formatGroupName(frontmatter.group || group),
      slug,
      title,
      order,
      description,
      path: docPath,
      filePath,
    });

    // Document-level search entry
    documents.push({
      id: `${group}/${slug}`,
      docTitle: title,
      heading: title,
      group,
      path: docPath,
      content: cleanMarkdown(body.slice(0, 300)),
    });

    // Heading-level sections
    const lines = body.split(/\r?\n/);
    let currentHeading = null;
    let currentId = null;
    let currentContent = [];

    const flushSection = () => {
      if (currentHeading && currentId) {
        const text = cleanMarkdown(currentContent.join('\n'));
        if (text.length > 0) {
          documents.push({
            id: `${group}/${slug}#${currentId}`,
            docTitle: title,
            heading: currentHeading,
            group,
            path: `${docPath}#${currentId}`,
            content: text,
          });
        }
      }
    };

    for (const line of lines) {
      const headingMatch = line.match(/^(#{2,4})\s+(.+)$/);
      if (headingMatch) {
        flushSection();
        currentHeading = headingMatch[2].trim();
        currentId = slugify(currentHeading);
        currentContent = [];
      } else {
        currentContent.push(line);
      }
    }
    flushSection();
  }

  // Sort manifest: by group, then order, then title
  manifest.sort((a, b) => {
    if (a.group !== b.group) return a.group.localeCompare(b.group);
    if (a.order !== b.order) return a.order - b.order;
    return a.title.localeCompare(b.title);
  });

  fs.writeFileSync(path.join(libDir, 'docs-manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');

  const miniSearch = new MiniSearch({
    fields: ['docTitle', 'heading', 'content'],
    storeFields: ['id', 'docTitle', 'heading', 'group', 'path', 'content'],
    searchOptions: {
      boost: { heading: 3, docTitle: 2 },
      fuzzy: 0.2,
      prefix: true,
    },
  });

  miniSearch.addAll(documents);

  const serialized = JSON.stringify(miniSearch.toJSON());
  fs.writeFileSync(path.join(publicDir, 'search-index.json'), serialized, 'utf8');
  console.log(`Search index successfully built with ${documents.length} entries.`);
}

buildIndex();
