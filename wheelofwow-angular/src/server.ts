import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import { existsSync } from 'node:fs';

const serverDistFolder = import.meta.dirname;
let browserDistFolder = join(serverDistFolder, '../browser');

// Fallback for dev mode where server.ts is run from src and dist is in project root
const devDistFolder = join(serverDistFolder, '../dist/wheelofwow-angular/browser');
if (!existsSync(browserDistFolder) && existsSync(devDistFolder)) {
  browserDistFolder = devDistFolder;
}

console.log('Server Dist Folder:', serverDistFolder);
console.log('Browser Dist Folder:', browserDistFolder);

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
    .catch(next);
});

/**
 * Serve index.html for CSR fallback when SSR fails or skips
 */
/**
 * Serve index.html for CSR fallback when SSR fails or skips
 */
app.use((req, res, next) => {
  const indexHtml = join(browserDistFolder, 'index.html');
  const indexCsr = join(browserDistFolder, 'index.csr.html');

  // Check if files exist on disk (false in 'ng serve' dev mode)
  const fallbackFile = existsSync(indexCsr) ? indexCsr : existsSync(indexHtml) ? indexHtml : null;

  if (fallbackFile) {
    res.sendFile(fallbackFile, (err) => {
      if (err) {
        console.error('Error serving fallback file:', err);
        next(err);
      }
    });
  } else {
    // In dev mode, files are in memory. Delegate to the next middleware (Angular Dev Server).
    next();
  }
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
