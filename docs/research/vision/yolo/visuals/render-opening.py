"""Original schematic animation; requires rsvg-convert and ImageMagick. Run at repo root."""
import math,pathlib,subprocess
root=pathlib.Path('output/research/yolo/opening');root.mkdir(parents=True,exist_ok=True)
public=pathlib.Path('public/figures/yolo')
for n in range(60):
 t=n/60; pulse=(math.sin(t*2*math.pi)+1)/2; scan=64+t*550
 s=['<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="600" viewBox="0 0 1080 600"><rect width="1080" height="600" rx="18" fill="#101a20"/>']
 s+=['<defs><pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M28 0H0V28" fill="none" stroke="#25343b" stroke-width=".6"/></pattern></defs><rect x="32" y="156" width="1016" height="396" rx="12" fill="url(#grid)"/>']
 def text(x,y,txt,size=18,color='#9eafb7',weight=400):s.append(f'<text x="{x}" y="{y}" font-family="sans-serif" font-size="{size}" font-weight="{weight}" fill="{color}">{txt}</text>')
 text(48,53,'LATENT LIGHT  /  REAL-TIME VISION',13,'#89a4ad',600);text(48,115,'One look. A world of objects.',42,'#f3f2eb',600)
 # Viewfinder and stylized scene.
 s.append('<rect x="48" y="184" width="552" height="326" rx="10" fill="#18262d" stroke="#3b525c"/><path d="M64 453H584" stroke="#49616b"/>')
 dx=6*math.sin(t*2*math.pi)
 s.append(f'<g transform="translate({dx} 0)"><path d="M108 376L131 340H237L271 376V421H108Z" fill="#526b75"/><path d="M144 351H221L240 376H129Z" fill="#9cb4bc"/><circle cx="143" cy="422" r="19" fill="#101a20" stroke="#708b95" stroke-width="6"/><circle cx="237" cy="422" r="19" fill="#101a20" stroke="#708b95" stroke-width="6"/></g>')
 s.append('<circle cx="342" cy="293" r="20" fill="#d9bc8b"/><path d="M318 326Q342 309 366 326L373 384H311Z" fill="#627e88"/><path d="M326 383L319 444M355 383L365 444" stroke="#b3c2c7" stroke-width="13" stroke-linecap="round"/><path d="M317 333L296 375M365 333L385 366" stroke="#9cb4bc" stroke-width="10" stroke-linecap="round"/>')
 s.append('<path d="M469 411V335" stroke="#849e8e" stroke-width="5"/><path d="M468 379Q419 369 435 335Q471 340 468 379M470 354Q474 307 508 321Q519 353 470 354" fill="#4c796a"/><path d="M444 408H494L485 447H453Z" fill="#ae8f66"/>')
 boxes=[(95+dx,326,190,124,'vehicle'),(292,261,102,193,'person'),(425,309,92,144,'plant')]
 for j,(x,y,w,h,label) in enumerate(boxes):
  opacity=.68+.30*math.sin((t-j*.1)*2*math.pi)**2
  s.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="3" fill="none" stroke="#7cdbc4" stroke-width="2" opacity="{opacity}"/><rect x="{x}" y="{y-23}" width="{len(label)*9+16}" height="23" rx="2" fill="#7cdbc4"/>');text(x+7,y-7,label,13,'#122b27',600)
 s.append(f'<path d="M{scan} 201V493" stroke="#e8bc78" opacity=".35" stroke-width="2"/>')
 # Feature stack and processing pulse, then object set.
 s.append('<path d="M616 351H664M780 351H824" stroke="#627c87" stroke-width="2"/><path d="M657 346L664 351L657 356M817 346L824 351L817 356" fill="none" stroke="#8fa9b4" stroke-width="2"/>')
 for i in range(3):s.append(f'<rect x="{680+i*12}" y="{300-i*12}" width="72" height="100" rx="4" fill="#1e373b" stroke="#6bb6aa" opacity="{.65+i*.12}"/>')
 text(672,437,'Shared features',14)
 for j,label in enumerate(['vehicle','person','plant']):
  y=270+j*66;s.append(f'<rect x="842" y="{y}" width="186" height="48" rx="5" fill="#1c3035" stroke="#3c5a62"/><circle cx="862" cy="{y+24}" r="4" fill="#7cdbc4"/>');text(878,y+30,label,18,'#e5eee9',500)
 text(842,244,'OBJECT SET',12,'#91aeb5',600)
 x=616+208*((t*2)%1);s.append(f'<circle cx="{x}" cy="351" r="4" fill="#edc38b"/>')
 text(48,568,'IMAGE',12,'#91aeb5',600);text(343,568,'LOCATE + RECOGNIZE',12,'#91aeb5',600);text(842,568,'USE THE RESULT',12,'#91aeb5',600)
 s.append('</svg>');svg=root/f'{n:03}.svg';svg.write_text(''.join(s));subprocess.run(['rsvg-convert',str(svg),'-o',str(root/f'{n:03}.png')],check=True)
subprocess.run(['magick',str(root/'015.png'),'-quality','92',str(public/'yolo-opening-v1.webp')],check=True)
subprocess.run(['magick','-delay','10','-loop','0',*[str(root/f'{n:03}.png') for n in range(60)],'-colors','96','-layers','Optimize',str(public/'yolo-opening-v1.gif')],check=True)
print('Rendered original schematic animation')
