#!/usr/bin/env python3
"""Apply changes to all Ukrainian HTML pages."""
import glob
import os
import re

base = r'c:\Users\gstep\fdk-site'

# Collect all files
files = glob.glob(os.path.join(base, 'uk', '*.html')) + glob.glob(os.path.join(base, 'uk', 'blog', '*.html'))

print(f"Processing {len(files)} files...")

# Bootstrap replacement
bootstrap_old = '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">'
bootstrap_new = '<link rel="preload" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" as="style" onload="this.onload=null;this.rel=\'stylesheet\'">\n    <noscript><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"></noscript>'

# Nav link replacements (Polish pages - both ../ and ../../ prefixed)
nav_replacements = {
    # From blog posts (../../ prefix)
    '../../index.html#kontakt': '/#kontakt',
    '../../index.html': '/',
    '../../programisci.html': '/programisci-graficy/',
    '../../ecommerce.html': '/e-commerce/',
    '../../architekci.html': '/architekci/',
    '../../tlumacze.html': '/tlumacze-lektorzy/',
    '../../muzycy.html': '/muzycy/',
    '../../inne-branze.html': '/inkubator-przedsiebiorczosci/',
    '../../cudzoziemcy.html': '/cudzoziemcy/',
    '../../dla-pracodawcow.html': '/dla-pracodawcow/',
    '../../o-nas.html': '/zespol-fundacji-firma-dla-kazdego/',
    '../../blog.html': '/blog/',
    '../../faq.html': '/faq/',
    '../../kontakt.html': '/kontakt/',
    # From uk pages (../ prefix)
    '../index.html#kontakt': '/#kontakt',
    '../index.html': '/',
    '../programisci.html': '/programisci-graficy/',
    '../ecommerce.html': '/e-commerce/',
    '../architekci.html': '/architekci/',
    '../tlumacze.html': '/tlumacze-lektorzy/',
    '../muzycy.html': '/muzycy/',
    '../inne-branze.html': '/inkubator-przedsiebiorczosci/',
    '../cudzoziemcy.html': '/cudzoziemcy/',
    '../dla-pracodawcow.html': '/dla-pracodawcow/',
    '../o-nas.html': '/zespol-fundacji-firma-dla-kazdego/',
    '../blog.html': '/blog/',
    '../faq.html': '/faq/',
    '../kontakt.html': '/kontakt/',
    # Additional patterns found in index.html
    '../inkubator-przedsiebiorczosci.html': '/inkubator-przedsiebiorczosci/',
    '../inne-uslugi.html': '/inne-uslugi/',
}

# UK internal links - remove .html and add trailing slash
# Pattern: /uk/something -> /uk/something/
# Also ../blog/xxx.html -> /uk/blog/xxx/ (for blog.html page listing)

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    filename = os.path.basename(filepath)
    relpath = os.path.relpath(filepath, base)

    # 1. Domain replacement
    content = content.replace('fdk-site.vercel.app', 'firmadlakazdego.pl')

    # 2. Fix hreflang/canonical trailing slashes - ensure paths end with /
    # Match href="https://firmadlakazdego.pl/something" where something doesn't end with / and isn't a file
    def fix_trailing_slash(m):
        url = m.group(1)
        # Don't add slash if it already ends with / or has a file extension or is just the domain
        if url.endswith('/') or '.' in url.split('/')[-1]:
            return m.group(0)
        return f'href="{url}/"'

    # Fix hreflang and canonical URLs
    content = re.sub(
        r'href="(https://firmadlakazdego\.pl(?:/[^"]*)?)"',
        fix_trailing_slash,
        content
    )

    # 3. Bootstrap async
    content = content.replace(bootstrap_old, bootstrap_new)

    # 4. Nav link replacements (Polish pages) - order matters, do longer patterns first
    for old, new in sorted(nav_replacements.items(), key=lambda x: -len(x[0])):
        content = content.replace(old, new)

    # 5. UK internal links - convert /uk/pagename to /uk/pagename/
    # Match href="/uk/something" where something doesn't end with /
    content = re.sub(
        r'href="/uk/([^"/#]+)"',
        r'href="/uk/\1/"',
        content
    )

    # 6. Blog post links from blog.html: ../blog/xxx.html -> /uk/blog/xxx/
    content = re.sub(
        r'href="\.\./blog/([^"]+)\.html"',
        r'href="/uk/blog/\1/"',
        content
    )

    # 7. Remove target="_blank" from internal links only
    # Internal links: those starting with /, /uk/, /uk/blog, #, etc.
    # Keep target="_blank" on external links (https://, http://, etc.)
    # Pattern: find <a ... href="internal" ... target="_blank" ...>
    # We need to be careful - target="_blank" can be before or after href

    # Remove target="_blank" from links with href starting with / or # (internal)
    # Match: href="/..." target="_blank" or href="#..." target="_blank"
    content = re.sub(
        r'(<a\s[^>]*href="[/#][^"]*"[^>]*?)\s+target="_blank"',
        r'\1',
        content
    )
    # Also handle case where target="_blank" comes before href
    content = re.sub(
        r'(<a\s[^>]*)target="_blank"\s+([^>]*href="[/#][^"]*")',
        r'\1\2',
        content
    )

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  Updated: {relpath}")
    else:
        print(f"  No changes: {relpath}")

print("\nDone!")
