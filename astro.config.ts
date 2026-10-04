import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import nimbus, {
  defineConfig as defineNimbusConfig,
} from "@cloudflare/nimbus-docs";
import { tableScroll } from "@cloudflare/nimbus-docs/markdown";
import { localContentEditor } from './plugins/local-content-editor.mjs';

const nimbusConfig = defineNimbusConfig({
  // CHANGE_ME: your site's canonical origin (no trailing slash). Drives
  // canonical URLs, absolute OG image URLs, robots.txt, sitemap, and the
  // links in /llms.txt — leaving the placeholder breaks all of them.
  site: process.env.SITE_URL ?? "http://localhost:4327",
  // CHANGE_ME: your project's name — used for <title>, the home H1, and OG.
  title: "Latent Light",
  // CHANGE_ME: a one-line description of your docs — used for meta + OG.
  description: "Seeing deeper. Thinking wider. A notebook exploring AI, products, and how we think, learn, and build.",
  locale: "en",
  github: "https://github.com/by-liu/latent-light",
  sidebar: {
    items: [
      { label: "Welcome", link: "/" },
      { label: "About", items: [
        { label: "About Latent Light", link: "/about/" },
        { label: "How this site is built", link: "/about/framework/" },
        { label: "Content standards", link: "/about/content-standards/" },
        { label: "Development guide", link: "/about/development-guide/" },
        { label: "Maintenance and upgrades", link: "/about/maintenance/" },
      ] },
    ],
  },
  socialImageAlt: "Latent Light — Seeing deeper. Thinking wider.",
});

export default defineConfig({
  // nimbus:adapter
  output: "static",
  redirects: {
    '/about/philosophy': '/about/#how-i-approach-learning',
  },
  devToolbar: { enabled: false },
  server: { host: "127.0.0.1", port: 4327 },
  // Tailwind v4 via its Vite plugin (the integration Astro recommends for
  // Tailwind v4 — replaces the PostCSS plugin, which doesn't build under
  // Astro 7's Vite 8 bundler).
  vite: {
    plugins: [tailwindcss(), localContentEditor()],
  },
  // Hover-prefetch link targets so full-page navigations feel instant without
  // a client-side router.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
  integrations: [
    {
      name: "latent-light:isolated-vite-cache",
      hooks: {
        "astro:config:setup": ({ command, updateConfig }) => {
          // Validation must not invalidate a running dev server's dependencies.
          updateConfig({
            vite: { cacheDir: `node_modules/.vite-${command === "dev" ? "dev" : "build"}` },
          });
        },
      },
    },
    nimbus(nimbusConfig, {
      // Authoring rules are opt-in by design — your repo, your taste. The
      // two below are the load-bearing pair: frontmatter has to validate
      // against the content schema for the page to render properly, and
      // broken internal links are 404s for your readers. Add the others
      // (heading hierarchy, code-block language, style, etc.) when you're
      // ready to enforce them — see `nimbus-docs lint --help`.
      rules: {
        "nimbus/frontmatter-shape": "error",
        "nimbus/internal-link": "error",
      },
      // Wrap wide tables so they scroll instead of overflowing the page
      // (styled by `.nb-table-scroll` in src/styles/prose.css).
      markdown: {
        hastPlugins: [tableScroll()],
      },
    }),
  ],
});
