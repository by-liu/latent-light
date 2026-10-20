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
import { modelFlowAsMarkdown } from './plugins/model-flow.mjs';
import { sourceFigureAsMarkdown } from './plugins/source-figure.mjs';
import { modelResourcesAsMarkdown } from './plugins/model-resources.mjs';
import { architectureAtlasAsMarkdown } from './plugins/architecture-atlas.mjs';
import { landscapeMapAsMarkdown } from './plugins/landscape-map.mjs';
import { researchTableAsMarkdown } from './plugins/research-table.mjs';
import { landscapeOverviewAsMarkdown } from './plugins/landscape-overview.mjs';
import { tasteVisualAsMarkdown } from './plugins/taste-visual.mjs';
import { agentCardsAsMarkdown, agentArchitectureAsMarkdown, agentLandscapeAsMarkdown } from './plugins/agent-presentation.mjs';
import { videoGalleryAsMarkdown } from './plugins/video-gallery.mjs';
import { podcastPlayerAsMarkdown } from './plugins/podcast-player.mjs';
import { documentSystemAsMarkdown } from './plugins/document-system.mjs';
import { comparisonTableAsMarkdown } from './plugins/comparison-table.mjs';

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
      { label: "AI Technology", items: [
        { label: "LLM & VLM", collapsed: true, items: [
          { label: "Overview", link: "/architectures/" },
          { label: "Foundations", link: "/architectures/foundations/" },
          { label: "Architectural Evolution", items: [
            { label: "Overview", link: "/architectures/evolution/" },
            { label: "Attention and memory", link: "/architectures/evolution/attention-and-memory/" },
            { label: "Position and long context", link: "/architectures/evolution/position-and-long-context/" },
            { label: "FFNs and experts", link: "/architectures/evolution/ffns-and-experts/" },
            { label: "Depth and residual paths", link: "/architectures/evolution/depth-and-residual-paths/" },
            { label: "Multimodal integration", link: "/architectures/evolution/multimodal-integration/" },
            { label: "Emerging directions", link: "/architectures/evolution/emerging-directions/" },
          ] },
          { label: "Model Deep Dives", items: [
            { label: "Overview", link: "/architectures/models/" },
            { label: "GPT", collapsed: true, items: [
              { label: "GPT-2", link: "/architectures/models/gpt-2/" },
              { label: "gpt-oss", link: "/architectures/models/gpt-oss/" },
            ] },
            { label: "BERT", link: "/architectures/models/bert/" },
            { label: "T5", link: "/architectures/models/t5/" },
            { label: "Llama", collapsed: true, items: [
              { label: "LLaMA", link: "/architectures/models/llama/" },
              { label: "Llama 3 / 3.1", link: "/architectures/models/llama-3/" },
            ] },
            { label: "Mistral", collapsed: true, items: [
              { label: "Mistral 7B", link: "/architectures/models/mistral-7b/" },
              { label: "Mixtral 8x7B", link: "/architectures/models/mixtral/" },
            ] },
            { label: "DeepSeek", collapsed: true, items: [
              { label: "DeepSeek-V2", link: "/architectures/models/deepseek-v2/" },
              { label: "DeepSeek-V3", link: "/architectures/models/deepseek-v3/" },
              { label: "DeepSeek-R1", link: "/architectures/models/deepseek-r1/" },
              { label: "DeepSeek-V4", link: "/architectures/models/deepseek-v4/" },
              { label: "DeepSeek-V4.1-Flash", link: "/architectures/models/deepseek-v4-1-flash/" },
            ] },
            { label: "Qwen", collapsed: true, items: [
              { label: "Qwen2.5", link: "/architectures/models/qwen2-5/" },
              { label: "Qwen2.5 1M", link: "/architectures/models/qwen2-5-1m/" },
              { label: "Qwen3", link: "/architectures/models/qwen3/" },
              { label: "Qwen3.8 Flash Next", link: "/architectures/models/qwen3-8-flash-next/" },
              { label: "Qwen2-VL", link: "/architectures/models/qwen2-vl/" },
              { label: "Qwen2.5-VL", link: "/architectures/models/qwen2-5-vl/" },
              { label: "Qwen3-VL", link: "/architectures/models/qwen3-vl/" },
            ] },
            { label: "GLM", collapsed: true, items: [
              { label: "GLM / GLM-130B", link: "/architectures/models/glm/" },
              { label: "GLM-4", link: "/architectures/models/glm-4/" },
              { label: "GLM-4.5", link: "/architectures/models/glm-4-5/" },
              { label: "GLM-4V", link: "/architectures/models/glm-4-v/" },
              { label: "GLM-5", link: "/architectures/models/glm-5/" },
            ] },
            { label: "Kimi", collapsed: true, items: [
              { label: "Kimi K2", link: "/architectures/models/kimi-k2/" },
              { label: "Kimi K3", link: "/architectures/models/kimi-k3/" },
              { label: "Kimi Linear", link: "/architectures/models/kimi-linear/" },
            ] },
            { label: "MiniMax", collapsed: true, items: [
              { label: "MiniMax 01", link: "/architectures/models/minimax-01/" },
              { label: "MiniMax M1", link: "/architectures/models/minimax-m1/" },
              { label: "MiniMax M2 Series", link: "/architectures/models/minimax-m2/" },
              { label: "MiniMax M3 / MSA", link: "/architectures/models/minimax-m3/" },
            ] },
            { label: "Mamba", link: "/architectures/models/mamba/" },
            { label: "CLIP", link: "/architectures/models/clip/" },
            { label: "BLIP-2", link: "/architectures/models/blip-2/" },
            { label: "LLaVA / 1.5", link: "/architectures/models/llava/" },
            { label: "Gemma", collapsed: true, items: [
              { label: "Gemma", link: "/architectures/models/gemma/" },
              { label: "Gemma 2", link: "/architectures/models/gemma-2/" },
              { label: "Gemma 3", link: "/architectures/models/gemma-3/" },
              { label: "Gemma 4", link: "/architectures/models/gemma-4/" },
            ] },
            { label: "InternVL 3", link: "/architectures/models/internvl-3/" },
          ] },
        ] },
        { label: "Document AI", link: "/document-ai/" },
        { label: "Knowledge Distillation", collapsed: true, items: [
          { label: "Overview", link: "/knowledge-distillation/" },
          { label: "Foundations", link: "/knowledge-distillation/foundations/" },
          { label: "Modern Methods", link: "/knowledge-distillation/modern-methods/" },
          { label: "LLM & VLM Recipes", link: "/knowledge-distillation/llm-vlm-recipes/" },
          { label: "Practice & Evaluation", link: "/knowledge-distillation/practice-evaluation/" },
        ] },
        { label: "Agents", items: [
          { label: "Overview", link: "/agents/" },
          { label: "Core Concepts", collapsed: true, items: [
            { label: "How Agents Work", link: "/agents/foundations/" },
            { label: "Tools & Skills", link: "/agents/tools-skills-protocols/" },
            { label: "Context & Memory", link: "/agents/context-memory-state/" },
            { label: "Workflows & Coordination", link: "/agents/orchestration/" },
            { label: "A Coding Workflow", link: "/agents/deep-dives/coding-agents/" },
          ] },
          { label: "Reliability & Control", collapsed: true, items: [
            { label: "Evaluation", link: "/agents/evaluation-reliability/" },
            { label: "Security & Control", link: "/agents/security-control/" },
          ] },
          { label: "Agent Deep Dives", collapsed: true, items: [
            { label: "Overview & Comparison", link: "/agents/deep-dives/" },
            { label: "Claude Code", link: "/agents/deep-dives/claude-code/" },
            { label: "Codex", link: "/agents/deep-dives/codex/" },
            { label: "Pi", link: "/agents/deep-dives/pi/" },
            { label: "OpenCode", link: "/agents/deep-dives/opencode/" },
            { label: "DeepSeek Harness", link: "/agents/deep-dives/deepseek-harness/" },
            { label: "Broader Ecosystem", link: "/agents/ecosystem/" },
          ] },
        ] },
        { label: "DeepInfer", link: "/inference/deepinfer/" },
        { label: "Local & Cloud AI", items: [
          { label: "Overview", link: "/edge-ai/local-cloud-collaboration/" },
          { label: "Cloud Agents & Local Specialists", link: "/local-cloud-ai/cloud-agents-local-specialists/" },
          { label: "Smart Devices & Cloud Agents", link: "/local-cloud-ai/smart-devices-cloud-agents/" },
        ] },
        { label: "Edge AI", collapsed: true, items: [
          { label: "Overview", link: "/edge-ai/" },
          { label: "Foundations & Bottlenecks", link: "/edge-ai/foundations/" },
          { label: "On Device Computing", link: "/edge-ai/on-device-computing/" },
          { label: "Efficient Models", link: "/edge-ai/efficient-models/" },
          { label: "Quantization & Compression", link: "/edge-ai/quantization-compression/" },
          { label: "Training Small Models", link: "/edge-ai/training-small-models/" },
          { label: "Efficient Inference", link: "/edge-ai/efficient-inference/" },
          { label: "Runtimes & Compilers", link: "/edge-ai/runtimes-compilers/" },
          { label: "Multimodal Workloads", link: "/edge-ai/multimodal/" },
          { label: "Agents & Hybrid Systems", link: "/edge-ai/agents-hybrid-systems/" },
          { label: "Evaluation & Profiling", link: "/edge-ai/evaluation-profiling/" },
          { label: "Production & Product Design", link: "/edge-ai/production-product-design/" },
        ] },
      ] },
      { label: "Human Capabilities", items: [
        { label: "High agency", link: "/human-capabilities/high-agency/" },
        { label: "Taste", link: "/human-capabilities/taste/" },
      ] },
      { label: "Products & Markets", items: [
        { label: "AI Landscapes", items: [
          { label: "Overview", link: "/products-markets/landscapes/" },
          { label: "Consumer AI Products", link: "/products-markets/landscapes/consumer-ai/" },
          { label: "Personal AI Agents", link: "/products-markets/landscapes/personal-agents/" },
          { label: "China’s Consumer AI Ecosystem", link: "/products-markets/landscapes/china-consumer-ai/" },
          { label: "Physical AI", link: "/products-markets/landscapes/physical-ai/" },
        ] },
      ] },
      { label: "About", items: [
        { label: "About Latent Light", link: "/about/" },
        { label: "How this site is built", link: "/about/framework/" },
        { label: "Content Guidance", collapsed: true, items: [
          { label: "Content standards", link: "/about/content-guidance/content-standards/" },
          { label: "Research workflow", link: "/about/content-guidance/research-workflow/" },
          { label: "Model Deep Dive guide", link: "/about/content-guidance/model-deep-dive-guide/" },
          { label: "Model Deep Dive template", link: "/about/content-guidance/model-deep-dive-template/" },
        ] },
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
    // Keep previous page and agent URLs pointed directly at their current source.
    '/about/content-standards': '/about/content-guidance/content-standards/',
    '/about/content-standards/index.md': '/about/content-guidance/content-standards/index.md',
    '/about/content-standards/index.mdx': '/about/content-guidance/content-standards/index.mdx',
    '/about/model-deep-dive-guide': '/about/content-guidance/model-deep-dive-guide/',
    '/about/model-deep-dive-guide/index.md': '/about/content-guidance/model-deep-dive-guide/index.md',
    '/about/model-deep-dive-guide/index.mdx': '/about/content-guidance/model-deep-dive-guide/index.mdx',
    '/about/model-deep-dive-template': '/about/content-guidance/model-deep-dive-template/',
    '/about/model-deep-dive-template/index.md': '/about/content-guidance/model-deep-dive-template/index.md',
    '/about/model-deep-dive-template/index.mdx': '/about/content-guidance/model-deep-dive-template/index.mdx',
    '/architectures/authoring/guide': '/about/content-guidance/model-deep-dive-guide/',
    '/architectures/authoring/guide/index.md': '/about/content-guidance/model-deep-dive-guide/index.md',
    '/architectures/authoring/guide/index.mdx': '/about/content-guidance/model-deep-dive-guide/index.mdx',
    '/architectures/authoring/template': '/about/content-guidance/model-deep-dive-template/',
    '/architectures/authoring/template/index.md': '/about/content-guidance/model-deep-dive-template/index.md',
    '/architectures/authoring/template/index.mdx': '/about/content-guidance/model-deep-dive-template/index.mdx',
    '/content-guidance/content-standards': '/about/content-guidance/content-standards/',
    '/content-guidance/content-standards/index.md': '/about/content-guidance/content-standards/index.md',
    '/content-guidance/content-standards/index.mdx': '/about/content-guidance/content-standards/index.mdx',
    '/content-guidance/model-deep-dive-guide': '/about/content-guidance/model-deep-dive-guide/',
    '/content-guidance/model-deep-dive-guide/index.md': '/about/content-guidance/model-deep-dive-guide/index.md',
    '/content-guidance/model-deep-dive-guide/index.mdx': '/about/content-guidance/model-deep-dive-guide/index.mdx',
    '/content-guidance/model-deep-dive-template': '/about/content-guidance/model-deep-dive-template/',
    '/content-guidance/model-deep-dive-template/index.md': '/about/content-guidance/model-deep-dive-template/index.md',
    '/content-guidance/model-deep-dive-template/index.mdx': '/about/content-guidance/model-deep-dive-template/index.mdx',
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
        "nimbus/internal-link": ["error", {
          // Static download notices are files, not Nimbus page routes.
          // test:content verifies these narrow exceptions exist in public/.
          ignore: ["/licenses/*.txt", "/figures/model-studies/*/{NOTICE,SOURCES}.md", "/figures/edge-ai/*/{NOTICE,SOURCES}.md", "/figures/local-cloud-ai/*/{NOTICE,SOURCES}.md", "/figures/knowledge-distillation/{NOTICE,SOURCES}.md"],
        }],
      },
      // Use the same native Sätteri processor as Nimbus, with math enabled.
      // Nimbus still supplies its admonitions and the normal Astro passes.
      markdown: {
        processor: satteri({
          features: { math: true },
          hastPlugins: [tableScroll(), referenceHeading(), mathTypesetting()],
        }),
        componentMap: {
          MathExpression: mathAsMarkdown,
          DocumentSystem: documentSystemAsMarkdown,
          ComparisonTable: comparisonTableAsMarkdown,
          ModelFlow: modelFlowAsMarkdown,
          SourceFigure: sourceFigureAsMarkdown,
          ModelResources: modelResourcesAsMarkdown,
          ArchitectureAtlas: architectureAtlasAsMarkdown,
          LandscapeMap: landscapeMapAsMarkdown,
          ResearchTable: researchTableAsMarkdown,
          LandscapeOverview: landscapeOverviewAsMarkdown,
          TasteVisual: tasteVisualAsMarkdown,
          AgentCards: agentCardsAsMarkdown,
          AgentArchitecture: agentArchitectureAsMarkdown,
          AgentLandscape: agentLandscapeAsMarkdown,
          VideoGallery: videoGalleryAsMarkdown,
          PodcastPlayer: podcastPlayerAsMarkdown,
        },
      },
    }),
  ],
});
