import test from 'node:test';
import assert from 'node:assert/strict';
import {renderEntryAsMarkdown} from '@cloudflare/nimbus-docs';
import {sourceFigureAsMarkdown} from '../plugins/source-figure.mjs';

test('SourceFigure exports the selected image, numbered anchor, caption and meaningful description',()=>{
 const body='<SourceFigure id="figure-2" src="/figures/example.png" alt="Complete mechanism description." minWidth={760}>\n<div slot="image">\n\n![Original mechanism.](/figures/example.png)\n\n</div>\n**Figure 2.** Source and scope.[^source]\n</SourceFigure>\n\n[^source]: Original report.';
 const md=renderEntryAsMarkdown({body,filePath:'figure.mdx'},{componentMap:{SourceFigure:sourceFigureAsMarkdown.render}});
 for(const text of ['<a id="figure-2"></a>','![Original mechanism.](/figures/example.png)','**Figure 2.** Source and scope.[^source]','**Image description:** Complete mechanism description.','[^source]: Original report.'])assert.ok(md.includes(text),text);
 assert.doesNotMatch(md,/<SourceFigure|slot="image"/);
});

test('SourceFigure does not invent an unsafe anchor or remove unrelated HTML',()=>{
 const out=sourceFigureAsMarkdown.render({attrs:{id:'bad"id'},children:'<div>Retained prose</div>'});
 assert.ok(out.includes('<div>Retained prose</div>'));
 assert.doesNotMatch(out,/<a id=/);
});
