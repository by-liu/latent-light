"""Animate an imagegen keyframe with original circuit pulses and chip sparks.
Run from the repository root; requires librsvg and ImageMagick. No model footage.
"""
import pathlib,subprocess,math,base64
root=pathlib.Path('output/research/jensen/tribute');root.mkdir(parents=True,exist_ok=True)
source=pathlib.Path('public/figures/jensen/jensen-building-v1.webp').resolve()
image_uri='data:image/webp;base64,'+base64.b64encode(source.read_bytes()).decode()
# A fixed global palette lets unchanged illustration pixels compress across frames.
subprocess.run(['magick',str(source),'-resize','1080x810!','-colors','256',str(root/'palette.png')],check=True)
paths=[[(44,198),(104,198),(175,269),(175,322),(306,322)],[(103,244),(145,244),(187,286),(187,345),(267,345)],[(1014,89),(1076,89),(1120,51),(1166,51)],[(867,197),(914,152),(1034,152),(1081,105),(1114,105)],[(254,1009),(428,1009),(468,969),(602,969),(640,1007),(768,1007),(801,974),(979,974)]]
def position(points,t):
 lengths=[math.hypot(b[0]-a[0],b[1]-a[1]) for a,b in zip(points,points[1:])];d=t*sum(lengths)
 for a,b,l in zip(points,points[1:],lengths):
  if d<=l:return a[0]+(b[0]-a[0])*d/l,a[1]+(b[1]-a[1])*d/l
  d-=l
 return points[-1]
for n in range(60):
 t=n/60;bits=[f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1080" height="810" viewBox="0 0 1448 1086"><image xlink:href="{image_uri}" width="1448" height="1086"/>']
 for i,points in enumerate(paths):
  for j in range(2):
   q=(t*1.5+i*.17+j*.5)%1;x,y=position(points,q);fade=math.sin(q*math.pi)**.5
   bits.append(f'<circle cx="{x:.2f}" cy="{y:.2f}" r="8" fill="#daff55" opacity="{fade*.24:.3f}"/><circle cx="{x:.2f}" cy="{y:.2f}" r="3.5" fill="#f7ffb6" opacity="{fade:.3f}"/>')
 # Sparks orbit the held chip without changing the face or implying speech.
 for i in range(6):
  a=t*2*math.pi+i*math.pi/3;x=985+85*math.cos(a);y=518+74*math.sin(a);size=3+(1+math.sin(a))
  bits.append(f'<path d="M{x-size:.2f} {y:.2f}h{size*2:.2f}M{x:.2f} {y-size:.2f}v{size*2:.2f}" stroke="{["#6bbf17","#ffc348","#3a9de2"][i%3]}" stroke-width="2" opacity=".85"/>')
 # Two small orbiting energy dots around the top-right chip.
 for i in range(2):
  a=t*2*math.pi+i*math.pi;x=1282+76*math.cos(a);y=115+66*math.sin(a)
  bits.append(f'<circle cx="{x:.2f}" cy="{y:.2f}" r="4" fill="#f3af20"/>')
 bits.append('</svg>');svg=root/f'frame-{n:03}.svg';svg.write_text(''.join(bits));png=root/f'frame-{n:03}.png';subprocess.run(['rsvg-convert',str(svg),'-o',str(png)],check=True)
 subprocess.run(['magick',str(png),'-dither','None','-remap',str(root/'palette.png'),str(png)],check=True)
subprocess.run(['magick','-delay','10','-loop','0',*[str(root/f'frame-{n:03}.png') for n in range(60)],'-layers','Optimize','public/figures/jensen/jensen-building-v1.gif'],check=True)
print('Created 60-frame, six-second illustrated loop.')
