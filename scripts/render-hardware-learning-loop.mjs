/** Assemble a looping animation from the generated keyframe. Requires rsvg-convert and ffmpeg. */
import {mkdir,copyFile,writeFile,rm} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {resolve} from 'node:path';

const source=resolve(process.argv[2]||'output/imagegen/hardware-101-learning-map-activated-v1.png');
const frames=resolve('output/imagegen/hardware-learning-loop-frames');
const target=resolve('public/figures/hardware/hardware-101-learning-map-motion-v1.gif');
await mkdir(frames,{recursive:true});
await copyFile(source,frames+'/base.png');
// Hand-traced conceptual signal paths on the generated illustration, in source pixels.
const paths=[
 {color:'#ffba43',points:[[315,368],[400,368],[444,382],[482,427],[520,447],[568,452]]},
 {color:'#31cadb',points:[[278,464],[324,461],[374,440],[412,429],[449,434],[493,456],[552,465]]},
 {color:'#6bdfb2',points:[[128,577],[168,560],[208,581],[248,562],[277,571],[317,537],[350,533],[397,487],[447,471],[492,479],[546,470]]},
 {color:'#ffb32c',points:[[906,479],[948,497],[983,483],[1025,484],[1078,501],[1135,522],[1180,527],[1220,514],[1270,506],[1312,495],[1345,459],[1376,434],[1404,425]]},
 {color:'#ffb32c',points:[[1220,514],[1256,508],[1290,518],[1326,531]]},
];
function point(points,t){
 const lengths=points.slice(1).map((p,i)=>Math.hypot(p[0]-points[i][0],p[1]-points[i][1]));
 let d=lengths.reduce((a,b)=>a+b,0)*t;
 for(let i=0;i<lengths.length;i++){
  if(d<=lengths[i]||i===lengths.length-1){const q=d/lengths[i];return points[i].map((v,j)=>v+(points[i+1][j]-v)*q);}
  d-=lengths[i];
 }
}
for(let frame=0;frame<48;frame++){
 const phase=frame/48;
 const pulse=(1-Math.cos(phase*Math.PI*2))/2;
 const dots=paths.map((path,index)=>Array.from({length:2},(_,packet)=>{
  const t=(phase+packet*.5+index*.13)%1;
  const [x,y]=point(path.points,t);
  const opacity=Math.min(1,t*12,(1-t)*12);
  return `<g opacity="${opacity}"><circle cx="${x}" cy="${y}" r="11" fill="${path.color}" filter="url(#soft)"/><circle cx="${x}" cy="${y}" r="4.5" fill="#fff9e8" stroke="${path.color}" stroke-width="2"/></g>`;
 }).join('')).join('');
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1248" height="714" viewBox="0 0 1659 948"><defs><filter id="soft" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="5"/></filter><radialGradient id="chip"><stop stop-color="#ffcc53" stop-opacity=".38"/><stop offset="1" stop-color="#ffcc53" stop-opacity="0"/></radialGradient></defs><image xlink:href="base.png" width="1659" height="948"/><ellipse cx="827" cy="465" rx="110" ry="64" fill="url(#chip)" opacity="${pulse}"/>${dots}</svg>`;
 const name=frames+'/frame-'+String(frame).padStart(3,'0');
 await writeFile(name+'.svg',svg);
 execFileSync('rsvg-convert',['-o',name+'.png',name+'.svg']);
}
execFileSync('ffmpeg',['-hide_banner','-loglevel','error','-y','-framerate','12.5','-i',frames+'/frame-%03d.png','-filter_complex','split[a][b];[a]palettegen=stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=4:diff_mode=rectangle','-loop','0',target],{stdio:'inherit'});
// Keep the keyframe and a few review frames, not the complete raster sequence.
for(let frame=0;frame<48;frame++)if(![0,12,24,36,47].includes(frame)){
 const name=frames+'/frame-'+String(frame).padStart(3,'0');
 await rm(name+'.png');await rm(name+'.svg');
}
console.log('Created '+target+' (48 frames × 80 ms = 3.84 seconds, infinite loop).');
