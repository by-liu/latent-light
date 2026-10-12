import {fromHtml} from 'hast-util-from-html';
import registry from '../src/data/company-icons.json' with {type:'json'};

/** Identification only. Page text, links and exported tables remain canonical. */
export const companyIcons = registry;
const escaped = value => String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
const text = node => node.type === 'text' ? node.value : (node.children ?? []).map(text).join('');
const firstLink = node => node.tagName === 'a' && /^https:\/\//.test(node.properties?.href ?? '')
  ? node : (node.children ?? []).map(firstLink).find(Boolean);

export function findCompanyIcon(href) {
  try {
    const url = new URL(href);
    if(url.protocol !== 'https:') return;
    const host = url.hostname.replace(/^www\./, '');
    return registry.find(icon => icon.keys.includes(host + url.pathname.replace(/\/$/, '')) || icon.keys.includes(host));
  } catch { return; }
}

/** Insert into parsed first-column cells without reserializing trusted slot HTML. */
export function decorateCompanyCells(html) {
  const root = fromHtml(html, {fragment:true});
  const insertions = [];
  const visit = node => {
    if(node.tagName === 'tr') {
      const cell = node.children?.find(child => child.tagName === 'td');
      const link = cell && firstLink(cell);
      if(cell && link && cell.position && !html.slice(cell.position.start.offset,cell.position.end.offset).includes('data-company-mark')) {
        const icon = findCompanyIcon(link.properties.href);
        const label = text(link).trim();
        const initials = icon?.initials ?? label.split(/\s+/).slice(0,2).map(word => Array.from(word)[0] ?? '').join('').toUpperCase();
        const src = icon?.asset;
        if(src && !/^\/company-icons\/[a-z0-9-]+\.png$/.test(src)) throw new Error('Company icon must use a reviewed local PNG.');
        const image = src ? '<img src="'+src+'" width="24" height="24" alt="" loading="lazy" decoding="async" />' : '';
        const mark = '<span class="company-mark" data-company-mark="'+escaped(icon?.id ?? 'initials')+'" aria-hidden="true"><span class="company-initials">'+escaped(initials)+'</span>'+image+'</span>';
        const start = html.indexOf('>',cell.position.start.offset)+1;
        const end = html.lastIndexOf('</td',cell.position.end.offset);
        if(end < start) throw new Error('Company cell has no closing tag.');
        insertions.push({offset:start,value:'<span class="company-identity">'+mark+'<span class="company-copy">'}, {offset:end,value:'</span></span>'});
      }
    }
    for(const child of node.children ?? [])visit(child);
  };
  visit(root);
  return insertions.sort((a,b)=>b.offset-a.offset).reduce((result,change)=>result.slice(0,change.offset)+change.value+result.slice(change.offset),html);
}
