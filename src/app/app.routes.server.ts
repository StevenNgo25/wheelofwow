import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'admin/**',
    renderMode: RenderMode.Server,
  },
  {
    path: ':lang',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: () => Promise.resolve([{ lang: 'en' }, { lang: 'vi' }]),
  },
  {
    path: ':lang/guide',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: () => Promise.resolve([{ lang: 'en' }, { lang: 'vi' }]),
  },
  {
    path: ':lang/pricing',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: () => Promise.resolve([{ lang: 'en' }, { lang: 'vi' }]),
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
