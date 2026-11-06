import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const contentDir = path.join(rootDir, 'src', 'content');
const publicDir = path.join(rootDir, 'public');

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

function generate() {
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const files = walkDir(contentDir);
  const staticRoutes = ['/', '/downloads', '/licenses'];
  const docRoutes = [];

  for (const file of files) {
    const relative = path.relative(contentDir, file).replace(/\\/g, '/');
    const match = relative.match(/^([^/]+)\/([^/]+)\.mdx$/);
    if (match) {
      docRoutes.push(`/docs/${match[1]}/${match[2]}`);
    }
  }

  const allRoutes = [...staticRoutes, ...docRoutes];

  // Sitemap
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (route) => `  <url>
    <loc>${route}</loc>
    <changefreq>weekly</changefreq>
  </url>`
  )
  .join('\n')}
</urlset>
`;
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf8');

  // Robots.txt
  const robotsTxt = `User-agent: *
Allow: /
Sitemap: /sitemap.xml
`;
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt, 'utf8');

  console.log(`Generated sitemap.xml with ${allRoutes.length} URLs and robots.txt`);
}

generate();
