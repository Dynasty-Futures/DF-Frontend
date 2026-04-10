/**
 * Prerender script — runs after `vite build` to generate static HTML
 * for each public route. Uses Vite's SSR build to render pages with
 * react-dom/server, then injects the result into the built index.html.
 *
 * Usage: tsx scripts/prerender.ts
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const distDir = path.resolve(root, 'dist');

const PUBLIC_ROUTES = [
  '/',
  '/pricing',
  '/rules',
  '/faq',
  '/support',
  '/legal',
  '/login',
  '/register'
];

async function prerender() {
  // Read the built index.html as a template
  const template = fs.readFileSync(path.resolve(distDir, 'index.html'), 'utf-8');

  // Create a Vite dev server in SSR mode just for module loading
  // (no HTTP server is started)
  const vite = await createServer({
    root,
    server: { middlewareMode: true },
    appType: 'custom',
  });

  try {
    // Load the server entry module through Vite's SSR pipeline
    const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');

    for (const route of PUBLIC_ROUTES) {
      console.log(`Prerendering ${route}...`);

      const { html: appHtml, helmet } = render(route);

      // Inject rendered HTML into the template
      let finalHtml = template.replace(
        '<div id="root"></div>',
        `<div id="root">${appHtml}</div>`,
      );

      // Replace the fallback <title> with Helmet's title if present
      const helmetTitle = helmet.title?.toString() || '';
      if (helmetTitle) {
        finalHtml = finalHtml.replace(
          /<title>Dynasty Futures<\/title>/,
          helmetTitle,
        );
      }

      // Inject remaining helmet tags (meta, link, script) before </head>
      const otherHelmetTags = [
        helmet.meta?.toString() || '',
        helmet.link?.toString() || '',
        helmet.script?.toString() || '',
      ]
        .filter(Boolean)
        .join('\n    ');

      if (otherHelmetTags) {
        finalHtml = finalHtml.replace('</head>', `    ${otherHelmetTags}\n  </head>`);
      }

      // Write to the correct path in dist/
      const filePath =
        route === '/'
          ? path.resolve(distDir, 'index.html')
          : path.resolve(distDir, route.slice(1), 'index.html');

      // Create directory if needed
      const dir = path.dirname(filePath);
      fs.mkdirSync(dir, { recursive: true });

      fs.writeFileSync(filePath, finalHtml);
      console.log(`  -> ${path.relative(root, filePath)}`);
    }

    // Prerender 404 page — Vercel auto-serves 404.html with status 404
    console.log('Prerendering /404...');
    const { html: notFoundHtml, helmet: notFoundHelmet } = render('/not-found-page');
    let notFoundFinal = template.replace(
      '<div id="root"></div>',
      `<div id="root">${notFoundHtml}</div>`,
    );
    const nfTitle = notFoundHelmet.title?.toString() || '';
    if (nfTitle) {
      notFoundFinal = notFoundFinal.replace(/<title>Dynasty Futures<\/title>/, nfTitle);
    }
    const nfTags = [
      notFoundHelmet.meta?.toString() || '',
      notFoundHelmet.link?.toString() || '',
    ].filter(Boolean).join('\n    ');
    if (nfTags) {
      notFoundFinal = notFoundFinal.replace('</head>', `    ${nfTags}\n  </head>`);
    }
    fs.writeFileSync(path.resolve(distDir, '404.html'), notFoundFinal);
    console.log('  -> dist/404.html');

    console.log(`\nPrerendered ${PUBLIC_ROUTES.length + 1} routes successfully.`);
  } finally {
    await vite.close();
    // Force exit since Vite's dev server may leave lingering handles
    process.exit(0);
  }
}

prerender().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
