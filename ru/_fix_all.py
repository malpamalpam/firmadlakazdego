#!/usr/bin/env python3
"""Apply all changes to Russian HTML pages."""
import os, glob, re

base = os.path.dirname(os.path.abspath(__file__))

# Collect all files
files = glob.glob(os.path.join(base, '*.html'))
files += glob.glob(os.path.join(base, 'blog', '*.html'))

bootstrap_old = '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">'
bootstrap_new = '<link rel="preload" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" as="style" onload="this.onload=null;this.rel=\'stylesheet\'">\n    <noscript><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"></noscript>'

# For minified lines where bootstrap link is inline
bootstrap_old_inline = '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">'

# Internal nav link replacements for ../ (used in ru/*.html pages pointing to PL pages)
dotdot_replacements = {
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
    '../inkubator-przedsiebiorczosci.html': '/inkubator-przedsiebiorczosci/',
    '../inne-uslugi.html': '/inne-uslugi/',
}

# For blog posts: ../../ paths (pointing to PL root pages)
dotdotdot_replacements = {
    '../../index.html#kontakt': '/#kontakt',
    '../../index.html#dla-kogo': '/#dla-kogo',
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
}

# Blog post links in blog.html: ../blog/X.html -> /blog/X/
# (these are Polish blog post URLs referenced from ru/blog.html)

def add_trailing_slash_to_hreflang(content):
    """Ensure hreflang and canonical URLs have trailing slashes on paths."""
    def fix_url(m):
        prefix = m.group(1)
        url = m.group(2)
        suffix = m.group(3)
        # Parse URL - add trailing slash if path doesn't end with /
        # Don't add slash if it's just domain root or already has trailing slash
        if '/' in url.split('//')[1]:  # has path after domain
            path_part = url.split('//')[1]
            domain_end = path_part.find('/')
            if domain_end >= 0:
                path = path_part[domain_end:]
                if not path.endswith('/'):
                    url = url + '/'
        else:
            # Just domain, add trailing slash
            if not url.endswith('/'):
                url = url + '/'
        return prefix + url + suffix

    # Fix hreflang URLs
    content = re.sub(
        r'(hreflang="[^"]*"\s+href=")(https://firmadlakazdego\.pl[^"]*?)(")',
        fix_url, content
    )
    # Fix canonical URLs
    content = re.sub(
        r'(rel="canonical"\s+href=")(https://firmadlakazdego\.pl[^"]*?)(")',
        fix_url, content
    )
    # Fix og:url
    content = re.sub(
        r'(property="og:url"\s+content=")(https://firmadlakazdego\.pl[^"]*?)(")',
        fix_url, content
    )
    return content

def remove_target_blank_internal(content):
    """Remove target="_blank" from internal links only."""
    # Match href="/..." or href="#..." with target="_blank"
    # Internal links: href starting with / or # or ./ or ../
    # Pattern: find <a ...href="(internal)"... target="_blank"...>
    # We need to be careful to only remove from internal links

    # Remove target="_blank" when it appears after an internal href
    # Internal = starts with / # ./ ../
    # Handle: href="/ru/blog" target="_blank"
    content = re.sub(
        r'(href="(?:/|#|\./|\.\./)(?:[^"]*)")\s+target="_blank"',
        r'\1',
        content
    )
    # Handle: target="_blank" ... href="(internal)" - less common but possible
    # Also handle case where target is before href
    return content

def fix_blog_post_links(content):
    """Fix ../blog/X.html links to /blog/X/ (Polish blog slugs)."""
    def replace_blog_link(m):
        slug = m.group(1)
        return 'href="/blog/' + slug + '/"'
    content = re.sub(r'href="\.\./blog/([^"]+)\.html"', replace_blog_link, content)
    return content

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # 1. Domain replacement
    content = content.replace('fdk-site.vercel.app', 'firmadlakazdego.pl')

    # 2. Bootstrap async
    content = content.replace(bootstrap_old, bootstrap_new)

    # 3. Internal nav links
    # Sort by length (longest first) to avoid partial replacements
    # For blog posts (../../ paths)
    if '/blog/' in filepath.replace('\\', '/'):
        for old, new in sorted(dotdotdot_replacements.items(), key=lambda x: -len(x[0])):
            content = content.replace('"' + old + '"', '"' + new + '"')
            # Also handle cases where it's part of a longer attribute
            content = content.replace("'" + old + "'", "'" + new + "'")

    # For all files: ../ paths (PL pages)
    for old, new in sorted(dotdot_replacements.items(), key=lambda x: -len(x[0])):
        content = content.replace('"' + old + '"', '"' + new + '"')
        content = content.replace("'" + old + "'", "'" + new + "'")

    # Fix blog post links in blog.html
    content = fix_blog_post_links(content)

    # Add trailing slashes to hreflang/canonical/og:url paths
    content = add_trailing_slash_to_hreflang(content)

    # 4. Remove target="_blank" from internal links
    content = remove_target_blank_internal(content)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        relpath = os.path.relpath(filepath, base)
        print(f'Updated: {relpath}')
    else:
        relpath = os.path.relpath(filepath, base)
        print(f'No changes: {relpath}')

print('\nDone!')
