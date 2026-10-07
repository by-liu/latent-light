import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import nimbus, {
  defineConfig as defineNimbusConfig,
} from "@cloudflare/nimbus-docs";
import { tableScroll } from "@cloudflare/nimbus-docs/markdown";
import { localContentEditor } from './plugins/local-content-editor.mjs';
import { referenceHeading } from './plugins/reference-heading.mjs';
import { satteri } from '@astrojs/markdown-satteri';
import { mathTypesetting, mathAsMarkdown } from './plugins/math-typesetting.mjs';

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
      { label: "LLM & VLM Architectures", items: [
        { label: "Overview", link: "/architectures/" },
        { label: "Foundations", link: "/architectures/foundations/" },
        { label: "Architectural Evolution", items: [
          { label: "Overview", link: "/architectures/evolution/" },
          { label: "Attention and memory", link: "/architectures/evolution/attention-and-memory/" },
          { label: "Position and long context", link: "/architectures/evolution/position-and-long-context/" },
          { label: "FFNs and experts", link: "/architectures/evolution/ffns-and-experts/" },
          { label: "Multimodal integration", link: "/architectures/evolution/multimodal-integration/" },
          { label: "Emerging directions", link: "/architectures/evolution/emerging-directions/" },
        ] },
        { label: "Model Studies", items: [
          { label: "Reading model architectures", link: "/architectures/models/" },
          { label: "GPT-2", link: "/architectures/models/gpt-2/" },
          { label: "Qwen3-VL", link: "/architectures/models/qwen3-vl/" },
        ] },
      ] },
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
      // Use the same native Sätteri processor as Nimbus, with math enabled.
      // Nimbus still supplies its admonitions and the normal Astro passes.
      markdown: {
        processor: satteri({
          features: { math: true },
          hastPlugins: [tableScroll(), referenceHeading(), mathTypesetting()],
        }),
        componentMap: { MathExpression: mathAsMarkdown },
      },
    }),
  ],
});
