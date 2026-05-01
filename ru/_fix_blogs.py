import os, glob, re

base = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'blog')
files = glob.glob(os.path.join(base, '*.html'))

replacements = [
    ('href="../../faq.html"', 'href="/faq/"'),
    ('href="../../blog.html"', 'href="/blog/"'),
    ('href="../../o-nas.html"', 'href="/zespol-fundacji-firma-dla-kazdego/"'),
    ('href="../../dla-pracodawcow.html"', 'href="/dla-pracodawcow/"'),
    ('href="../../cudzoziemcy.html"', 'href="/cudzoziemcy/"'),
    ('href="../../inne-branze.html"', 'href="/inkubator-przedsiebiorczosci/"'),
    ('href="../../muzycy.html"', 'href="/muzycy/"'),
    ('href="../../tlumacze.html"', 'href="/tlumacze-lektorzy/"'),
    ('href="../../architekci.html"', 'href="/architekci/"'),
    ('href="../../ecommerce.html"', 'href="/e-commerce/"'),
    ('href="../../programisci.html"', 'href="/programisci-graficy/"'),
    ('href="../../index.html"', 'href="/"'),
]

for f in files:
    with open(f, 'r', encoding='utf-8') as fh:
        c = fh.read()
    o = c
    for old, new in replacements:
        c = c.replace(old, new)
    # Remove target="_blank" from internal links
    c = re.sub(r'(href="(?:/|#|\./|\.\./)(?:[^"]*)")\s+target="_blank"', r'\1', c)
    if c != o:
        with open(f, 'w', encoding='utf-8') as fh:
            fh.write(c)
        print('Updated:', os.path.basename(f))

print('Done!')
