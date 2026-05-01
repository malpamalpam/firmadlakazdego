#!/usr/bin/env python3
"""Apply bulk changes to all EN HTML pages."""
import glob
import re
import os

BASE = r"c:\Users\gstep\fdk-site\en"

# Collect all files
files = glob.glob(os.path.join(BASE, "*.html")) + glob.glob(os.path.join(BASE, "blog", "*.html"))

print(f"Found {len(files)} files to process")

for fpath in files:
    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()

    original = content
    is_blog = "\\blog\\" in fpath or "/blog/" in fpath

    # 1. Domain replacement
    content = content.replace("fdk-site.vercel.app", "firmadlakazdego.pl")

    # Fix trailing slashes on hreflang/canonical paths
    # /en" -> /en/" , /uk" -> /uk/" , /ru" -> /ru/"
    content = re.sub(r'(href="https://firmadlakazdego\.pl/(en|uk|ru))"', r'\1/"', content)
    # Paths like /programisci" /blog" etc. need trailing slash too
    content = re.sub(r'(href="https://firmadlakazdego\.pl/[^"]*[^/])"(\s*/?>)', r'\1/"\2', content)
    # But not for assets like .png, .jpg etc.
    content = re.sub(r'(href="https://firmadlakazdego\.pl/assets/[^"]*)/(")', r'\1\2', content)
    content = re.sub(r'(content="https://firmadlakazdego\.pl/assets/[^"]*)/(")', r'\1\2', content)
    # Fix double slashes that might have been introduced (but not after https:)
    # Actually let's be more careful. Just fix specific known patterns.
    # Re-check: canonical/hreflang URLs for paths like /en/programmers should end with /
    content = re.sub(r'(href="https://firmadlakazdego\.pl/[^"]+[^/])"(\s)', r'\1/"\2', content)
    # Same for og:url content
    content = re.sub(r'(content="https://firmadlakazdego\.pl/[^"]+[^/])"(\s)', r'\1/"\2', content)
    # But again not for file extensions
    content = re.sub(r'(\.(png|jpg|jpeg|svg|webp|css|js))/(")', r'\1\3', content)

    # 2. Bootstrap async
    content = content.replace(
        '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">',
        '<link rel="preload" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" as="style" onload="this.onload=null;this.rel=\'stylesheet\'">\n    <noscript><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"></noscript>'
    )

    # 3. Internal nav links

    # --- Blog posts use ../../ prefix for PL pages ---
    if is_blog:
        content = content.replace('href="../../index.html#kontakt"', 'href="/#kontakt"')
        content = content.replace('href="../../index.html#contact"', 'href="/#kontakt"')
        content = content.replace('href="../../index.html#dla-kogo"', 'href="/#dla-kogo"')
        content = content.replace('href="../../index.html"', 'href="/"')
        content = content.replace('href="../../programisci.html"', 'href="/programisci-graficy/"')
        content = content.replace('href="../../ecommerce.html"', 'href="/e-commerce/"')
        content = content.replace('href="../../architekci.html"', 'href="/architekci/"')
        content = content.replace('href="../../tlumacze.html"', 'href="/tlumacze/"')
        content = content.replace('href="../../muzycy.html"', 'href="/muzycy/"')
        content = content.replace('href="../../inne-branze.html"', 'href="/inne-branze/"')
        content = content.replace('href="../../o-nas.html"', 'href="/zespol-fundacji-firma-dla-kazdego/"')
        content = content.replace('href="../../cudzoziemcy.html"', 'href="/cudzoziemcy/"')
        content = content.replace('href="../../dla-pracodawcow.html"', 'href="/dla-pracodawcow/"')
        content = content.replace('href="../../blog.html"', 'href="/blog/"')
        content = content.replace('href="../../faq.html"', 'href="/faq/"')
        content = content.replace('href="../../regulamin.html"', 'href="/regulamin/"')
        content = content.replace('href="../../kontakt.html"', 'href="/kontakt/"')
        content = content.replace('href="../../inkubator-przedsiebiorczosci.html"', 'href="/inkubator-przedsiebiorczosci/"')
        content = content.replace('href="../../inne-uslugi.html"', 'href="/inne-uslugi/"')

    # --- EN pages use ../ prefix for PL pages ---
    content = content.replace('href="../index.html#kontakt"', 'href="/#kontakt"')
    content = content.replace('href="../index.html#contact"', 'href="/#kontakt"')
    content = content.replace('href="../index.html#dla-kogo"', 'href="/#dla-kogo"')
    content = content.replace('href="../index.html"', 'href="/"')
    content = content.replace('href="../programisci.html"', 'href="/programisci-graficy/"')
    content = content.replace('href="../ecommerce.html"', 'href="/e-commerce/"')
    content = content.replace('href="../architekci.html"', 'href="/architekci/"')
    content = content.replace('href="../tlumacze.html"', 'href="/tlumacze/"')
    content = content.replace('href="../muzycy.html"', 'href="/muzycy/"')
    content = content.replace('href="../inne-branze.html"', 'href="/inne-branze/"')
    content = content.replace('href="../o-nas.html"', 'href="/zespol-fundacji-firma-dla-kazdego/"')
    content = content.replace('href="../cudzoziemcy.html"', 'href="/cudzoziemcy/"')
    content = content.replace('href="../dla-pracodawcow.html"', 'href="/dla-pracodawcow/"')
    content = content.replace('href="../blog.html"', 'href="/blog/"')
    content = content.replace('href="../faq.html"', 'href="/faq/"')
    content = content.replace('href="../regulamin.html"', 'href="/regulamin/"')
    content = content.replace('href="../kontakt.html"', 'href="/kontakt/"')
    content = content.replace('href="../inkubator-przedsiebiorczosci.html"', 'href="/inkubator-przedsiebiorczosci/"')
    content = content.replace('href="../inne-uslugi.html"', 'href="/inne-uslugi/"')

    # EN internal links (from within /en/ pages)
    # index.html -> /en/
    content = re.sub(r'href="index\.html#kontakt"', 'href="/en/#kontakt"', content)
    content = re.sub(r'href="index\.html#contact"', 'href="/en/#kontakt"', content)
    content = re.sub(r'href="index\.html"', 'href="/en/"', content)

    # EN page .html links without path prefix
    content = content.replace('href="programmers.html"', 'href="/en/programmers/"')
    content = content.replace('href="ecommerce.html"', 'href="/en/ecommerce/"')
    content = content.replace('href="architects.html"', 'href="/en/architects/"')
    content = content.replace('href="translators.html"', 'href="/en/translators/"')
    content = content.replace('href="musicians.html"', 'href="/en/musicians/"')
    content = content.replace('href="other-industries.html"', 'href="/en/other-industries/"')
    content = content.replace('href="foreigners.html"', 'href="/en/foreigners/"')
    content = content.replace('href="employers.html"', 'href="/en/employers/"')
    content = content.replace('href="about.html"', 'href="/en/about/"')
    content = content.replace('href="blog.html"', 'href="/en/blog/"')
    content = content.replace('href="faq.html"', 'href="/en/faq/"')
    content = content.replace('href="contact.html"', 'href="/en/contact/"')
    content = content.replace('href="terms.html"', 'href="/en/terms/"')
    content = content.replace('href="how-it-works.html"', 'href="/en/how-it-works/"')
    content = content.replace('href="incubator.html"', 'href="/en/incubator/"')
    content = content.replace('href="other-services.html"', 'href="/en/other-services/"')
    content = content.replace('href="insurance.html"', 'href="/en/insurance/"')
    content = content.replace('href="legalization.html"', 'href="/en/legalization/"')
    content = content.replace('href="legal-help.html"', 'href="/en/legal-help/"')
    content = content.replace('href="legal-assistance.html"', 'href="/en/legal-assistance/"')
    content = content.replace('href="sworn-translations.html"', 'href="/en/sworn-translations/"')
    content = content.replace('href="residence-and-work-permits.html"', 'href="/en/residence-and-work-permits/"')
    content = content.replace('href="government-procedures.html"', 'href="/en/government-procedures/"')
    content = content.replace('href="insurance-policies.html"', 'href="/en/insurance-policies/"')
    content = content.replace('href="official-matters.html"', 'href="/en/official-matters/"')
    content = content.replace('href="sports-and-medical-packages.html"', 'href="/en/sports-and-medical-packages/"')
    content = content.replace('href="sports-medical-packages.html"', 'href="/en/sports-medical-packages/"')
    content = content.replace('href="services-for-companies.html"', 'href="/en/services-for-companies/"')
    content = content.replace('href="services-for-employers-of-foreigners.html"', 'href="/en/services-for-employers-of-foreigners/"')

    # Add trailing slashes to /en/ nav links that don't have them
    # Match href="/en/something" but not href="/en/something/" and not href="/en/#..."
    content = re.sub(r'href="/en/([a-z][a-z0-9-]*)"', r'href="/en/\1/"', content)

    # Lang switcher: ../ -> /, ./ -> /en/
    content = re.sub(r'href="\.\./">(\s*(?:🇵🇱\s*)?PL)', r'href="/">\1', content)
    content = re.sub(r'href="\./\s*">(\s*(?:🇬🇧\s*)?ENG)', r'href="/en/">\1', content)
    content = re.sub(r'href="\./\s*">', r'href="/en/">', content)
    # Also ../uk/ -> /uk/ and ../ru/ -> /ru/
    content = content.replace('href="../uk/"', 'href="/uk/"')
    content = content.replace('href="../ru/"', 'href="/ru/"')
    content = content.replace('href="../">', 'href="/">')

    # 4. Remove target="_blank" from internal links (keep on external)
    # Internal: /en/blog, /en/..., /, /#kontakt, etc
    content = re.sub(r'(<a\s[^>]*href="(/en/[^"]*|/[^"]*)"[^>]*)\s*target="_blank"', r'\1', content)
    # Also for # links
    content = re.sub(r'(<a\s[^>]*href="#[^"]*"[^>]*)\s*target="_blank"', r'\1', content)

    if content != original:
        with open(fpath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"  Updated: {os.path.basename(fpath)}")
    else:
        print(f"  No changes: {os.path.basename(fpath)}")

print("\nDone!")
