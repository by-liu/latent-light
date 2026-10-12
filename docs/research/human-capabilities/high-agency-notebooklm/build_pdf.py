#!/usr/bin/env python3
"""Render the canonical source document as a selectable-text, linked PDF.

Requirements: reportlab, markdown, pillow. Run from any directory. The default
output is output/pdf/high-agency-notebooklm-source.pdf at the repository root.
Figures 2 and 3 are independent vector diagrams generated here.
"""
from __future__ import annotations

import argparse
import html
import json
import re
from pathlib import Path
import xml.etree.ElementTree as ET

import markdown
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (BaseDocTemplate, PageTemplate, Frame, Paragraph,
                               Spacer, PageBreak, Table, TableStyle, Flowable,
                               KeepTogether, CondPageBreak)
from reportlab.platypus.tableofcontents import TableOfContents

ROOT = Path(__file__).resolve().parents[4]
TASK = Path(__file__).resolve().parent
INK = colors.HexColor('#17243a')
NAVY = colors.HexColor('#10213e')
BLUE = colors.HexColor('#176e91')
CYAN = colors.HexColor('#59d7eb')
PALE = colors.HexColor('#edf5f8')
GREY = colors.HexColor('#54647a')
WIDTH, HEIGHT = A4
MARGIN = 49
CONTENT = WIDTH - 2 * MARGIN


def register_fonts():
    for family, stem in [('Body', 'NotoSans'), ('Serif', 'NotoSerif')]:
        for suffix, file_suffix in [('', 'Regular'), ('Bold', 'Bold'),
                                    ('Italic', 'Italic'), ('BoldItalic', 'BoldItalic')]:
            pdfmetrics.registerFont(TTFont(family + suffix,
                f'/usr/share/fonts/noto/{stem}-{file_suffix}.ttf'))
        pdfmetrics.registerFontFamily(family, normal=family, bold=family+'Bold',
                                     italic=family+'Italic', boldItalic=family+'BoldItalic')


def make_styles():
    base = dict(fontName='Body', fontSize=10.3, leading=15.2, textColor=INK,
                spaceAfter=8.3, allowWidows=0, allowOrphans=0)
    return {
        'body': ParagraphStyle('body', **base),
        'h2': ParagraphStyle('h2', fontName='SerifBold', fontSize=21, leading=27,
                             textColor=NAVY, spaceBefore=18, spaceAfter=14,
                             keepWithNext=True),
        'h3': ParagraphStyle('h3', fontName='BodyBold', fontSize=12.2, leading=17,
                             textColor=BLUE, spaceBefore=10, spaceAfter=7,
                             keepWithNext=True),
        'caption': ParagraphStyle('caption', fontName='Body', fontSize=8.5,
                                  leading=12.2, textColor=GREY, spaceAfter=10),
        'small': ParagraphStyle('small', fontName='Body', fontSize=9,
                                leading=13, textColor=GREY, spaceAfter=8),
        'cell': ParagraphStyle('cell', fontName='Body', fontSize=9,
                               leading=12.8, textColor=INK),
        'cellhead': ParagraphStyle('cellhead', fontName='BodyBold', fontSize=9,
                                   leading=12.8, textColor=colors.white),
        'quote': ParagraphStyle('quote', **{**base, 'leftIndent':14, 'rightIndent':12,
                                          'borderPadding':12, 'backColor':PALE,
                                          'spaceBefore':8, 'spaceAfter':12}),
        'ref': ParagraphStyle('ref', fontName='Body', fontSize=8.8, leading=13,
                              textColor=INK, spaceAfter=11, leftIndent=20,
                              firstLineIndent=-20),
        'toc': ParagraphStyle('toc', fontName='Body', fontSize=10.2, leading=15,
                              leftIndent=0, firstLineIndent=0, spaceBefore=9,
                              rightIndent=28),
    }


class Diagram(Flowable):
    def __init__(self, number, styles):
        super().__init__()
        self.number, self.styles = number, styles
        self.width = CONTENT
        self.height = 172 if number == 2 else 181

    def draw(self):
        c = self.canv
        c.setFillColor(PALE)
        c.roundRect(0, 0, self.width, self.height, 10, fill=1, stroke=0)
        title = 'AI expands your reach. Agency makes it useful.' if self.number == 2 else 'From intention to useful action'
        heading = Paragraph(title, ParagraphStyle('diagram-title', fontName='BodyBold',
                            fontSize=11.5, leading=16, textColor=NAVY))
        heading.wrap(self.width-32, 40)
        heading.drawOn(c, 16, self.height-29)
        if self.number == 2:
            steps = [('AI expands options', 'Explanations, drafts,<br/>alternatives'),
                     ('You choose and act', 'A useful goal, checks,<br/>a bounded attempt'),
                     ('Feedback guides you', 'Revise, continue,<br/>seek help, or stop')]
            footer = 'Added capability becomes useful through direction, action, and feedback.'
        else:
            steps = [('Choose an outcome', 'What would make<br/>this worthwhile?'),
                     ('Find room to act', 'What can I do,<br/>learn, or ask for?'),
                     ('Try a bounded step', 'Make a reasonable<br/>attempt with limits.'),
                     ('Check and adjust', 'Compare the result<br/>with the goal.')]
            footer = 'Feedback can change the next step, the support needed, or the goal.'
        n = len(steps)
        gap, inset = 12, 14
        boxw = (self.width - 2*inset - (n-1)*gap) / n
        y, boxh = 55, 75
        for i, (label, detail) in enumerate(steps):
            x = inset+i*(boxw+gap)
            c.setFillColor(colors.white)
            c.setStrokeColor(colors.HexColor('#c8dde6'))
            c.roundRect(x, y, boxw, boxh, 6, stroke=1, fill=1)
            p = Paragraph(label, ParagraphStyle('node-label', fontName='BodyBold',
                          fontSize=9.2 if n==3 else 8.7, leading=12, textColor=BLUE))
            _, ph = p.wrap(boxw-14, boxh)
            p.drawOn(c, x+7, y+boxh-10-ph)
            p = Paragraph(detail, ParagraphStyle('node-detail', fontName='Body',
                          fontSize=8.7, leading=12, textColor=INK))
            _, ph = p.wrap(boxw-14, boxh)
            p.drawOn(c, x+7, y+9)
            if i < n-1:
                c.setStrokeColor(BLUE)
                c.line(x+boxw+2,y+boxh/2,x+boxw+gap-2,y+boxh/2)
                c.line(x+boxw+gap-2,y+boxh/2,x+boxw+gap-5,y+boxh/2+3)
                c.line(x+boxw+gap-2,y+boxh/2,x+boxw+gap-5,y+boxh/2-3)
        c.setStrokeColor(BLUE)
        c.setLineWidth(.8)
        start, end = inset+boxw/2, self.width-inset-boxw/2
        c.line(end,y-2,end,y-10)
        c.line(end,y-10,start,y-10)
        c.line(start,y-10,start,y-2)
        c.line(start,y-2,start-3,y-5)
        c.line(start,y-2,start+3,y-5)
        note = Paragraph(footer, self.styles['small'])
        note.wrap(self.width-32, 40)
        note.drawOn(c, 16, 12)


class Cover(Flowable):
    def __init__(self, styles, intro, caption):
        super().__init__()
        self.styles, self.intro, self.caption = styles, intro, caption
        self.width, self.height = CONTENT, HEIGHT-105

    def draw(self):
        c, h = self.canv, self.height
        c.setFillColor(BLUE)
        c.setFont('BodyBold', 9)
        c.drawString(0, h-5, 'LATENT LIGHT  /  HUMAN CAPABILITIES')
        c.setFillColor(NAVY)
        c.setFont('SerifBold', 37)
        c.drawString(0, h-57, 'High Agency')
        c.setFont('Body', 19)
        c.drawString(0, h-87, 'Your superpower in the AI era')
        c.setFillColor(GREY)
        c.setFont('Body', 9.5)
        c.drawString(0, h-110, 'Expanded source edition, version 2  /  October 11, 2026')
        image_size = 384
        x = (self.width-image_size)/2
        c.drawImage(str(TASK/'../high-agency/visuals/overview-v3.png'),
                    x, h-510, image_size, image_size, mask='auto')
        cap = Paragraph(self.caption, self.styles['caption'])
        _, caph = cap.wrap(CONTENT, 100)
        cap.drawOn(c,0,h-521-caph)
        label = Paragraph('A comprehensive source for thoughtful podcasts and videos',
                          self.styles['h3'])
        _, lh = label.wrap(CONTENT,100)
        label.drawOn(c,0,h-572-lh)
        p = Paragraph(self.intro, self.styles['small'])
        _, ph = p.wrap(CONTENT,140)
        p.drawOn(c,0,h-602-ph)


class SourceDoc(BaseDocTemplate):
    def __init__(self, filename, styles):
        super().__init__(str(filename), pagesize=A4, leftMargin=MARGIN,
                         rightMargin=MARGIN, topMargin=51, bottomMargin=51,
                         title='High Agency: Your superpower in the AI era',
                         author='Latent Light',
                         subject='Comprehensive evidence-informed source for NotebookLM podcast and video generation')
        self.styles = styles
        frame = Frame(MARGIN,51,CONTENT,HEIGHT-102,leftPadding=0,rightPadding=0,
                      topPadding=0,bottomPadding=0,id='body')
        self.addPageTemplates(PageTemplate(id='main', frames=[frame], onPage=self.chrome))
        self.heading_count = 0
        self.heading_pages = {}

    def beforeDocument(self):
        self.heading_count = 0
        self.heading_pages = {}

    def chrome(self,c,doc):
        c.saveState()
        if doc.page>1:
            c.setStrokeColor(colors.HexColor('#d6e1e7'))
            c.line(MARGIN,HEIGHT-32,WIDTH-MARGIN,HEIGHT-32)
            c.setFillColor(GREY)
            c.setFont('Body',8)
            c.drawString(MARGIN,HEIGHT-23,'HIGH AGENCY  /  EXPANDED SOURCE EDITION')
        c.setFillColor(GREY)
        c.setFont('Body',8)
        c.drawString(MARGIN,28,'Latent Light  |  October 11, 2026')
        c.drawRightString(WIDTH-MARGIN,28,str(doc.page))
        c.restoreState()

    def afterFlowable(self,flowable):
        if isinstance(flowable,Paragraph) and flowable.style.name=='h2':
            self.heading_count+=1
            key='section-'+str(self.heading_count)
            title=flowable.getPlainText()
            self.canv.bookmarkPage(key)
            self.canv.addOutlineEntry(title,key,0,False)
            self.notify('TOCEntry',(0,title,self.page,key))
            self.heading_pages[title]=self.page


def inner(node):
    out=html.escape(node.text or '')
    for child in node:
        out+=ET.tostring(child,encoding='unicode',method='xml')
    return out


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output',type=Path,default=ROOT/'output/pdf/high-agency-notebooklm-source.pdf')
    args=parser.parse_args()
    register_fonts()
    styles=make_styles()
    source=(TASK/'report.md').read_text()
    body=re.sub(r'\A---\n[\s\S]*?\n---\n','',source).strip()
    refs=dict(re.findall(r'^\[\^([^\]]+)\]: (.+)$',body,re.M))
    body=re.sub(r'^\[\^[^\]]+\]: .+\n?', '',body,flags=re.M)
    used=list(dict.fromkeys(re.findall(r'\[\^([^\]]+)\](?!:)',body)))
    numbers={key:i+1 for i,key in enumerate(used)}
    counts={key:0 for key in used}

    def citation(match):
        key=match[1]
        counts[key]+=1
        return f'<a name="cite-{numbers[key]}-{counts[key]}"/><super><a href="#ref-{numbers[key]}" color="#176e91">[{numbers[key]}]</a></super>'

    body=re.sub(r'\[\^([^\]]+)\](?!:)',citation,body)
    cover_part,body=body.split('<!-- pagebreak -->',1)
    cover_intro=re.search(r'This document[^\n]+',cover_part)[0]
    cover_caption=re.search(r'\*\*Figure 1\.\*\*[^\n]+',cover_part)[0]
    cover_caption=markdown.markdown(cover_caption)[3:-4]
    body=body.replace('<!-- visual-id: V002 -->','\n<div class="diagram" data-number="2"></div>\n')
    body=body.replace('<!-- visual-id: V003 -->','\n<div class="diagram" data-number="3"></div>\n')
    root=ET.fromstring('<root>'+markdown.markdown(body,extensions=['tables'])+'</root>')
    story=[Cover(styles,cover_intro,cover_caption),PageBreak()]
    story.append(Paragraph('Contents',ParagraphStyle('contents-title',parent=styles['h2'])))
    story.append(Paragraph('The explanation stands on its own. Follow the full argument or start with a practical section. The production brief is optional editorial guidance.',styles['body']))
    toc=TableOfContents()
    toc.levelStyles=[styles['toc']]
    story.extend([toc,Spacer(1,20),Paragraph('Evidence, interpretation, and original examples are distinguished throughout. References provide optional verification and attribution; no outside reading is required.',styles['small']),PageBreak()])
    for node in root:
        tag=node.tag
        if tag=='h2':
            if (node.text or '').startswith(('Appendix B.',)):
                story.append(PageBreak())
            else:
                story.append(CondPageBreak(135))
            story.append(Paragraph(inner(node),styles['h2']))
        elif tag=='h3':
            story.append(Paragraph(inner(node),styles['h3']))
        elif tag=='p':
            text=inner(node)
            style='caption' if text.startswith('<strong>Figure ') else 'body'
            story.append(Paragraph(text,styles[style]))
        elif tag=='div' and node.attrib.get('class')=='diagram':
            story.append(KeepTogether([Diagram(int(node.attrib['data-number']),styles),Spacer(1,8)]))
        elif tag=='table':
            # Permit a long table to split after its heading instead of moving
            # the entire block and leaving a large gap on the previous page.
            if story and isinstance(story[-1],Paragraph) and story[-1].style.name=='h3':
                heading=story.pop()
                heading.style=ParagraphStyle('table-heading',parent=styles['h3'],keepWithNext=False)
                story.extend([CondPageBreak(135),heading])
            rows=[]
            for row in node.findall('.//tr'):
                rows.append([Paragraph(inner(cell),styles['cellhead' if cell.tag=='th' else 'cell']) for cell in row])
            if len(rows[0])==3:
                if rows[0][0].getPlainText()=='Concept':
                    widths=[96,188,CONTENT-284]
                elif rows[0][0].getPlainText()=='Period':
                    widths=[75,226,CONTENT-301]
                else:
                    widths=[129,190,CONTENT-319]
            else:
                widths=[CONTENT/len(rows[0])]*len(rows[0])
            table=Table(rows,colWidths=widths,repeatRows=1,hAlign='LEFT')
            table.setStyle(TableStyle([
                ('BACKGROUND',(0,0),(-1,0),NAVY),
                ('ROWBACKGROUNDS',(0,1),(-1,-1),[PALE,colors.white]),
                ('VALIGN',(0,0),(-1,-1),'TOP'),
                ('LEFTPADDING',(0,0),(-1,-1),8),('RIGHTPADDING',(0,0),(-1,-1),8),
                ('TOPPADDING',(0,0),(-1,-1),9),('BOTTOMPADDING',(0,0),(-1,-1),9),
                ('LINEBELOW',(0,0),(-1,0),.6,NAVY),
                ('LINEBELOW',(0,1),(-1,-1),.35,colors.HexColor('#d4e2e9')),
            ]))
            story.extend([table,Spacer(1,10)])
        elif tag in ('ul','ol'):
            for i,li in enumerate(node):
                prefix='• ' if tag=='ul' else f'{i+1}. '
                style=ParagraphStyle('item',parent=styles['body'],leftIndent=12,
                                     firstLineIndent=-12,spaceAfter=6)
                story.append(Paragraph(prefix+inner(li),style))
            story.append(Spacer(1,4))
        elif tag=='blockquote':
            text='<br/>'.join(inner(p) for p in node)
            story.append(Paragraph(text,styles['quote']))
        else:
            raise ValueError('Unsupported top-level element: '+tag)
    for key in used:
        num=numbers[key]
        rendered=markdown.markdown(refs[key])[3:-4]
        rendered=rendered.replace('<a href=','<a color="#176e91" href=')
        text=f'<a name="ref-{num}"/><b>[{num}]</b> '+rendered
        text+=f' <a href="#cite-{num}-1" color="#176e91">[return]</a>'
        story.append(KeepTogether([Paragraph(text,styles['ref'])]))
    args.output.parent.mkdir(parents=True,exist_ok=True)
    doc=SourceDoc(args.output,styles)
    doc.multiBuild(story)
    metadata={'output':args.output.name,'source':'report.md','reference_count':len(used),
              'page_count':doc.page,'headings':doc.heading_pages,
              'citation_occurrences':sum(counts.values()),'figures':3,
              'body_word_count':len(re.findall(r"\b[\w'-]+\b",re.sub(r'<[^>]*>','',body)))}
    print(json.dumps(metadata,indent=2))


if __name__=='__main__':
    main()
