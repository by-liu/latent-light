"""Encode an original 2026 Davos photo as a gentle six-second camera loop.

Run from repository root with Python 3 and ImageMagick. No generative edits.
Photo: ©2026 World Economic Forum / Thibaut Bouvier, CC BY-NC-SA 4.0.
https://www.flickr.com/photos/worldeconomicforum/55053488739
The source, poster and resulting GIF retain CC BY-NC-SA 4.0, not the repo MIT.
"""
import math
import pathlib
import subprocess

root = pathlib.Path('output/research/jensen/photo-motion')
root.mkdir(parents=True, exist_ok=True)
assets = pathlib.Path('public/figures/jensen')
source = assets / 'jensen-davos-2026-source.jpg'
poster = assets / 'jensen-davos-2026.webp'

def run(*args):
    subprocess.run(['magick', *map(str, args)], check=True)

run(source, '-resize', '840x560^', '-gravity', 'center', '-extent', '840x560',
    '-quality', '90', poster)
run(poster, '-colors', '256', root / 'palette.png')
frames = []
for n in range(40):
    # A cosine trajectory has matching position and velocity at the seam.
    # Preserve the whole subject; only the virtual camera moves, by at most 4%.
    zoom = 1 + .04 * (1 - math.cos(2 * math.pi * n / 40)) / 2
    width, height = round(840 * zoom), round(560 * zoom)
    frame = root / f'frame-{n:03}.png'
    run(source, '-resize', f'{width}x{height}^', '-gravity', 'center',
        '-extent', '840x560', '-dither', 'None', '-remap', root / 'palette.png', frame)
    frames.append(frame)
run('-delay', '15', '-loop', '0', *frames, '-layers', 'Optimize',
    assets / 'jensen-davos-2026.gif')
run(assets / 'jensen-davos-2026.gif', '-coalesce', '-quality', '82',
    '-define', 'webp:method=6', assets / 'jensen-davos-2026-motion.webp')
print('Created six-second photo loop: 40 frames, 840 × 560.')
