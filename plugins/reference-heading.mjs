/**
 * Make the native reference list visible without replacing Nimbus's processor.
 * @returns {import('satteri').HastPluginDefinition}
 */
export function referenceHeading() {
  return {
    name: 'latent-light:reference-heading',
    element: {
      filter: ['h2'],
      visit(node) {
        if (node.properties?.id !== 'footnote-label') return;
        const classes = node.properties.className;
        let className = classes;
        if (Array.isArray(classes)) {
          className = classes.filter(value => value !== 'sr-only');
        } else if (typeof classes === 'string') {
          className = classes.split(/\s+/).filter(value => value !== 'sr-only');
        }
        // Satteri visitor nodes expose read-only children; return a replacement.
        return {
          type: 'element', tagName: 'h2',
          properties: {...node.properties, ...(className === undefined ? {} : {className})},
          children: [{type: 'text', value: 'References'}],
        };
      },
    },
  };
}
