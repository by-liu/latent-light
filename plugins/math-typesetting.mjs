import katex from 'katex';
import {fromHtml} from 'hast-util-from-html';

const classes = node => {
  const value = node.properties?.className;
  return Array.isArray(value) ? value : String(value ?? '').split(/\s+/);
};

/** Shared build-time renderer. Never pass trust or a shared macros object. */
export function renderMath(tex, displayMode = false, source = 'Markdown') {
  try {
    return katex.renderToString(tex, {
      displayMode,
      output: 'htmlAndMathml',
      throwOnError: true,
      strict: 'error',
      trust: false,
      maxSize: 20,
      maxExpand: 1000,
    });
  } catch (error) {
    throw new Error(`Invalid equation in ${source}: ${error.message}`, {cause: error});
  }
}

/** Protect Nimbus's attribute-based export scanner from ambiguous markup. */
export function validateMdxMath(tex) {
  if (typeof tex !== 'string' || !tex.trim()) throw new Error('MathExpression requires a static tex attribute.');
  if (/[<>]/.test(tex)) throw new Error('Use \\lt and \\gt instead of angle brackets in MathExpression.');
  return tex.trim();
}

/** Explicit authoring keeps page numbering identical in HTML and exports. */
export function prepareMdxMath(tex, displayMode = false, number) {
  const expression = validateMdxMath(tex);
  if (number === undefined) return expression;
  if (!displayMode) throw new Error('Only display equations can have a number.');
  if (typeof number !== 'string' || !/^[1-9]\d*$/.test(number)) {
    throw new Error('Equation number must be a static positive integer string.');
  }
  if (/\\tag\*?\s*\{/.test(expression)) {
    throw new Error('Use either the number attribute or a TeX tag, not both.');
  }
  return `${expression}\n\\tag{${number}}`;
}

/** Standard numeric tags supply the same anchor for Markdown and MDX. */
export function equationNumber(tex) {
  return tex.match(/\\tag\s*\{([1-9]\d*)\}/)?.[1];
}

/** Export the MDX component as standard LaTeX, not a stripped visual. */
export const mathAsMarkdown = {
  revision: '2',
  render({attrs}) {
    const displayMode = attrs.display === true || attrs.display === 'true';
    const tex = prepareMdxMath(attrs.tex, displayMode, attrs.number);
    return displayMode
      ? `\n\n$$\n${tex}\n$$\n\n`
      : `$${tex}$`;
  },
};

/**
 * Typeset native Sätteri math nodes at build time, for Markdown pages.
 * @returns {import('satteri').HastPluginDefinition}
 */
export function mathTypesetting() {
  /** @returns {import('hast').Element} */
  function render(code, displayMode, ctx) {
    const tex = ctx.textContent(code);
    const html = renderMath(tex, displayMode, ctx.fileURL);
    const number = displayMode ? equationNumber(tex) : undefined;
    // A fresh render has local macros. MathML and its TeX annotation remain
    // available to assistive readers; no browser renderer or CDN is needed.
    return {
      type: 'element', tagName: displayMode ? 'div' : 'span',
      properties: displayMode
        ? {
          className: ['ll-equation'], tabIndex: 0, role: 'region',
          ariaLabel: number ? `Equation (${number})` : 'Mathematical expression',
          ...(number ? {id: `equation-${number}`, 'data-equation-number': number} : {}),
        }
        : {className: ['ll-math-inline']},
      children: fromHtml(html, {fragment: true}).children.filter(child => child.type !== 'doctype'),
    };
  }
  return {
    name: 'latent-light:math-typesetting',
    element: [
      {
        filter: ['pre'],
        visit(node, ctx) {
          const code = node.children.find(child => child.type === 'element' && child.tagName === 'code');
          if (code && classes(code).includes('math-display')) return render(code, true, ctx);
        },
      },
      {
        filter: ['code'],
        visit(node, ctx) {
          if (classes(node).includes('math-inline')) return render(node, false, ctx);
        },
      },
    ],
  };
}
