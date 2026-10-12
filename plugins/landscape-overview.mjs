/** Preserve the stable image anchor, Markdown image and cited caption. */
export const landscapeOverviewAsMarkdown={
  revision:'1',
  render({attrs,children}){
    if(typeof attrs.id!=='string'||!/^figure-\d+$/.test(attrs.id))throw new Error('LandscapeOverview needs a figure-N anchor.');
    const body=(children??'').replace(/<\/?div\b[^>]*>/g,'').trim();
    return '\n\n<a id="'+attrs.id+'"></a>\n\n'+body+'\n\n';
  }
};
