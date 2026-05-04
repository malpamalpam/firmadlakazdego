import re, os, glob

os.chdir(r'c:\Users\gstep\fdk-site')

# Find all HTML files
files = []
for pattern in ['*.html', 'blog/*.html', 'en/*.html', 'en/blog/*.html', 'ru/*.html', 'ru/blog/*.html', 'uk/*.html', 'uk/blog/*.html']:
    files.extend(glob.glob(pattern))

# Remove index.html and stronafdk
files = [f for f in files if f != 'index.html' and 'stronafdk' not in f]

count = 0
for filepath in sorted(set(files)):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    if 'logo-dark.png' not in content:
        continue

    # Replace bare <img> tags with logo-dark.png that are NOT already inside <picture>
    # Pattern: <img src="(PREFIX)logo-dark.png"(ATTRS)>
    # But NOT when preceded by <picture> or <source

    new_content = re.sub(
        r'(?<!<picture>)(?<!type="image/webp">)(<img\s+src="((?:\.\./)*assets/img/)logo-dark\.png"([^>]*)>)',
        lambda m: '<picture><source srcset="' + m.group(2) + 'logo-dark.webp" type="image/webp">' + m.group(1) + '</picture>',
        content
    )

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        count += 1
        print(f'Updated: {filepath}')
    else:
        # Check if file has logo-dark.png in img tags but wasn't changed
        if re.search(r'<img[^>]*logo-dark\.png[^>]*>', content):
            if '<picture>' in content:
                print(f'SKIPPED (already wrapped): {filepath}')
            else:
                print(f'WARNING - NOT UPDATED: {filepath}')

print(f'\nTotal files updated: {count}')
