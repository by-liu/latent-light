/** Normalize rendered headings and Markdown heading text for source positioning. */
export function normalizeHeading(value: string): string {
  return value.replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ').replace(/[`*_~]/g, '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ').trim().toLocaleLowerCase();
}

/** Find a real Markdown section, ignoring headings inside fenced examples. */
export function findHeadingOffset(source: string, heading: string): number {
  const target = normalizeHeading(heading);
  if (!target) return -1;
  let offset = 0, fence = '', fenceLength = 0;
  for (const line of source.split('\n')) {
    const delimiter = /^ {0,3}(`{3,}|~{3,})/.exec(line);
    if (delimiter) {
      if (!fence) {fence = delimiter[1][0];fenceLength = delimiter[1].length;}
      else if (delimiter[1][0] === fence && delimiter[1].length >= fenceLength && /^ {0,3}(?:`+|~+)\s*$/.test(line)) fence = '';
    } else if (!fence) {
      const match = /^ {0,3}#{2,6}\s+(.+?)\s*#*\s*$/.exec(line);
      if (match && normalizeHeading(match[1]) === target) return offset;
      // References is generated from native footnotes rather than a source heading.
      if (target === 'references' && /^\[\^[^\]]+\]:/.test(line)) return offset;
    }
    offset += line.length + 1;
  }
  return -1;
}
