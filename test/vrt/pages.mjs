// Resolves the full list of page paths to visually test, at runtime.
// Prefers Edge Delivery's built-in content index (/query-index.json) and
// falls back to /sitemap.xml. No hand-maintained page list.

const asPath = (url, origin) => {
  try { return new URL(url, origin).pathname; } catch { return null; }
};

async function fromQueryIndex(origin) {
  const res = await fetch(`${origin}/query-index.json`);
  if (!res.ok) throw new Error(`query-index ${res.status}`);
  const { data } = await res.json();
  return data.map((row) => row.path).filter(Boolean);
}

async function fromSitemap(origin) {
  const res = await fetch(`${origin}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => asPath(m[1], origin))
    .filter(Boolean);
}

// Returns unique, sorted page paths (e.g. ['/', '/about']).
export async function resolvePages(origin) {
  let paths;
  try {
    paths = await fromQueryIndex(origin);
  } catch {
    paths = await fromSitemap(origin);
  }
  return [...new Set(paths)].sort();
}
