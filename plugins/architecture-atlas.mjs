/** Shared text equivalents for original, code-native mechanism illustrations. */
export const architectureAtlas = {
  reading: {
    title: 'One subject, three useful views',
    panels: [
      {label: '01 · Foundations', drawing: 'block', detail: 'Trace tokens through attention, feature transformations and residual connections.'},
      {label: '02 · Architectural Evolution', drawing: 'axes', detail: 'Compare what changes in history, position, capacity, depth and visual evidence.'},
      {label: '03 · Model Deep Dives', drawing: 'report', detail: 'Inspect a named model through its report, released artifact and implementation.'},
    ],
    note: 'Reading paths, not a chronology or a ranking.',
  },
  design: {
    title: 'Follow information, not release names',
    panels: [
      {label: 'Across tokens', drawing: 'tokens', detail: 'Attention exchanges evidence between positions. Cache and connectivity determine what can be read.'},
      {label: 'Inside a token', drawing: 'experts', detail: 'Feature transformations and expert routing allocate computation while returning to the residual width.'},
      {label: 'Across depth', drawing: 'depth', detail: 'Residual paths determine how earlier representations reach later computation.'},
      {label: 'From pixels', drawing: 'patches', detail: 'An encoder and interface turn visual evidence into representations usable by the language model.'},
    ],
    note: 'Coordinates affect matching; training teaches these routes what to carry. This map abstracts over the exact model stack.',
  },
  memory: {
    title: 'Four ways to retain or read the past',
    panels: [
      {label: 'Explicit history', drawing: 'history', detail: 'Store keys and values by position. GQA reduces the number of KV heads, not the number of retained positions.'},
      {label: 'Compressed history', drawing: 'latent', detail: 'MLA retains a compact content latent plus a positional key for each token. The history still grows.'},
      {label: 'Selected reads', drawing: 'sparse', detail: 'An indexer selects tokens or blocks before the main attention operation. Unselected history may still occupy storage.'},
      {label: 'Recurrent state', drawing: 'state', detail: 'Update a fixed-shape state instead of appending one record per token. Earlier details must survive compression.'},
    ],
    note: 'FlashAttention is a separate execution choice: it avoids a full score matrix in HBM without removing dense pairwise arithmetic.',
  },
  rope: {
    title: 'Shift both positions, preserve their separation',
    panels: [
      {label: 'Positions 1 and 2', drawing: 'rotation-a', detail: 'Identical unit content vectors rotate to 45° and 90°. Their separation is 45°.'},
      {label: 'Positions 2 and 3', drawing: 'rotation-b', detail: 'The same vectors rotate to 90° and 135°. Their separation remains 45°.'},
    ],
    note: 'Toy frequency θ = π/4. This illustrates one feature pair, not measured attention weights or complete head geometry.',
  },
  gate: {
    title: 'One token, two feature branches',
    panels: [
      {label: 'SwiGLU', drawing: 'gate', detail: 'The same input x enters Wg and Wu. SiLU transforms the gate branch; elementwise multiplication combines both branches; Wd returns the result to width D.'},
    ],
    note: 'Every branch is computed. The gate is not a probability and does not choose an expert.',
  },
  hybrid: {
    title: 'A hybrid has more than one memory lifetime',
    panels: [
      {label: 'Kimi Linear · 3 KDA : 1 MLA', drawing: 'recurrent-hybrid', detail: 'KDA layers retain fixed-shape recurrent state; periodic global MLA layers still retain growing token history.'},
      {label: 'Gemma 3 · 5 local : 1 global', drawing: 'local-hybrid', detail: 'Local layers keep a bounded attention window; periodic global layers retain full history. Local attention is not recurrence.'},
    ],
    note: 'R: recurrent KDA. L: local window. G: global MLA or softmax, as named above. These layer patterns are not interchangeable definitions of hybrid attention. FFNs and residuals are omitted.',
  },
  depth: {
    title: 'Which representations reach the next computation?',
    panels: [
      {label: 'Ordinary residual', drawing: 'residual', detail: 'One stream bypasses a sublayer and adds its update. Normalization placement is a separate choice.'},
      {label: 'Constrained multiple streams', drawing: 'multistream', detail: 'Read from several streams, compute one sublayer update, then mix the bypass and distribute the update. mHC constrains bypass mixing.'},
      {label: 'Attention across depth', drawing: 'depth-attention', detail: 'A learned query weights earlier representations or block summaries for the next sublayer. These sources are layers, not earlier sequence positions.'},
      {label: 'Gated reads and writes', drawing: 'gated-depth', detail: 'Read gates combine residual branches into a sublayer input; write gates distribute its update. Qwen3.8-Next does not use unrestricted branch-to-branch mixing.'},
    ],
    note: 'Illustrative routes. Extra streams and retained depth sources have memory and movement costs even when the sublayer width stays fixed.',
  },
  vision: {
    title: 'Four interfaces with different jobs',
    panels: [
      {label: 'CLIP · match representations', drawing: 'contrastive', detail: 'Separate image and text encoders produce comparable representations. CLIP alone is not a generative language decoder.'},
      {label: 'BLIP-2 · query the image', drawing: 'queries', detail: 'Learned queries read vision features. Projected query outputs become visual prompts during generative pretraining.'},
      {label: 'LLaVA · project the features', drawing: 'projection', detail: 'A connector maps image features into the language embedding space. Original LLaVA uses a linear projection; 1.5 uses an MLP.'},
      {label: 'Qwen3-VL · add depth routes', drawing: 'injection', detail: 'Merged visual tokens enter the input; selected intermediate vision features also enter early decoder layers through DeepStack.'},
    ],
    note: 'The number of drawn cells is illustrative. Training and frozen-backbone choices depend on the model and stage.',
  },
  budget: {
    title: 'Resolution grows a budget before merging reduces it',
    panels: [
      {label: 'A 4 × 4 patch grid', drawing: 'merge-small', detail: 'Sixteen patch features merged in 2 × 2 neighborhoods become four language-side visual tokens.'},
      {label: 'Twice the height and width', drawing: 'merge-large', detail: 'An 8 × 8 grid has 64 patches. The same merging rule gives 16 visual tokens: four times the original count.'},
    ],
    note: 'Toy geometry at a fixed patch size, without crops, padding, class tokens or delimiters. This is not a latency measurement.',
  },
  experiment: {
    title: 'Change one mechanism; inspect several outcomes',
    panels: [
      {label: 'A comparison with a shared contract', drawing: 'paired', detail: 'Baseline and candidate receive matched data, tasks and a declared training or active-compute budget. Runtime comparisons also identify kernel, precision and hardware.'},
      {label: 'A result with visible tradeoffs', drawing: 'metrics', detail: 'Read quality, latency, retained state, total weights and communication separately. Then inspect failure slices and repeat under changed conditions.'},
    ],
    note: 'An experimental design proposed here, not an experiment or benchmark result.',
  },
};

export function readArchitectureAtlas(kind) {
  if (typeof kind !== 'string' || !Object.hasOwn(architectureAtlas, kind)) {
    throw new Error('ArchitectureAtlas requires a supported static kind.');
  }
  return architectureAtlas[kind];
}

export const architectureAtlasAsMarkdown = {
  revision: '1',
  render({attrs, children}) {
    const figure = readArchitectureAtlas(attrs.kind);
    if (typeof attrs.id !== 'string' || !/^[a-z][\w-]*$/.test(attrs.id)) {
      throw new Error('ArchitectureAtlas requires a stable figure ID.');
    }
    const text = figure.panels.map(panel => '**' + panel.label + '**: ' + panel.detail);
    return '\n\n<a id="' + attrs.id + '"></a>\n\n**' + figure.title + '**\n\n' +
      text.join('\n\n') + '\n\n' + figure.note + '\n\n' + (children ?? '') + '\n\n';
  },
};
