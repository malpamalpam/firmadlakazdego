import glob, os, re
BASE = r"c:\Users\gstep\fdk-site\en"
files = glob.glob(os.path.join(BASE, "*.html")) + glob.glob(os.path.join(BASE, "blog", "*.html"))
for fpath in files:
    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()
    original = content
    # Add trailing slashes to /en/page links
    content = re.sub(r'href="/en/([a-z][a-z0-9-]*)"', r'href="/en/\1/"', content)
    # Fix hreflang/canonical trailing slashes
    content = re.sub(r'(href="https://firmadlakazdego\.pl/(en|uk|ru))"', r'\1/"', content)
    content = re.sub(r'(href="https://firmadlakazdego\.pl/[a-z][^"]*[^/])"(\s*/?>)', r'\1/"\2', content)
    content = re.sub(r'(content="https://firmadlakazdego\.pl/[a-z][^"]*[^/])"(\s*/?>)', r'\1/"\2', content)
    # Don't add slash after file extensions
    content = re.sub(r'(\.(png|jpg|jpeg|svg|webp|css|js))/(")', r'\1\3', content)
    # Fix lang switcher
    content = re.sub(r'href="\.\./\s*">', r'href="/">', content)
    content = content.replace('href="./">', 'href="/en/">')
    content = content.replace('href="../uk/"', 'href="/uk/"')
    content = content.replace('href="../ru/"', 'href="/ru/"')
    if content != original:
        with open(fpath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"  Updated: {os.path.basename(fpath)}")
print("Done!")
