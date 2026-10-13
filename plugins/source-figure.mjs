/** Preserve original artwork, its anchor, description and caption in text exports. */
export const sourceFigureAsMarkdown = {
  revision: '1',
  render({attrs, children}) {
    const anchor = typeof attrs.id === 'string' && /^[a-z][\w-]*$/.test(attrs.id)
      ? '<a id="' + attrs.id + '"></a>\n\n' : '';
    // The named image slot is a presentation wrapper, not article content.
    const content = (children ?? '').replace(/<div\s+slot=["']image["']\s*>([\s\S]*?)<\/div>/g, '$1').trim();
    const description = typeof attrs.alt === 'string' && attrs.alt.trim()
      ? '**Image description:** ' + attrs.alt.trim() : '';
    return '\n\n' + anchor + [content, description].filter(Boolean).join('\n\n') + '\n\n';
  },
};
