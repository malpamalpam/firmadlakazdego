const fs = require('fs');
const path = require('path');

const base = 'c:\\Users\\gstep\\fdk-site';
const ukDir = path.join(base, 'uk');
const blogDir = path.join(base, 'uk', 'blog');

// Collect files
let files = fs.readdirSync(ukDir).filter(f => f.endsWith('.html')).map(f => path.join(ukDir, f));
if (fs.existsSync(blogDir)) {
    files = files.concat(fs.readdirSync(blogDir).filter(f => f.endsWith('.html')).map(f => path.join(blogDir, f)));
}

console.log(`Processing ${files.length} files...`);

const bootstrapOld = '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">';
const bootstrapNew = '<link rel="preload" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" as="style" onload="this.onload=null;this.rel=\'stylesheet\'">\n    <noscript><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"></noscript>';

// Replacements ordered by specificity (longest first)
const replacements = [
    // ../../ patterns (blog posts)
    ['../../index.html#kontakt', '/#kontakt'],
    ['../../index.html#dla-kogo', '/#dla-kogo'],
    ['../../index.html', '/'],
    ['../../programisci.html', '/programisci-graficy/'],
    ['../../ecommerce.html', '/e-commerce/'],
    ['../../architekci.html', '/architekci/'],
    ['../../tlumacze.html', '/tlumacze-lektorzy/'],
    ['../../muzycy.html', '/muzycy/'],
    ['../../inne-branze.html', '/inkubator-przedsiebiorczosci/'],
    ['../../cudzoziemcy.html', '/cudzoziemcy/'],
    ['../../dla-pracodawcow.html', '/dla-pracodawcow/'],
    ['../../o-nas.html', '/zespol-fundacji-firma-dla-kazdego/'],
    ['../../blog.html', '/blog/'],
    ['../../faq.html', '/faq/'],
    ['../../kontakt.html', '/kontakt/'],
    // ../ patterns (uk pages)
    ['../index.html#kontakt', '/#kontakt'],
    ['../index.html', '/'],
    ['../programisci.html', '/programisci-graficy/'],
    ['../ecommerce.html', '/e-commerce/'],
    ['../architekci.html', '/architekci/'],
    ['../tlumacze.html', '/tlumacze-lektorzy/'],
    ['../muzycy.html', '/muzycy/'],
    ['../inne-branze.html', '/inkubator-przedsiebiorczosci/'],
    ['../cudzoziemcy.html', '/cudzoziemcy/'],
    ['../dla-pracodawcow.html', '/dla-pracodawcow/'],
    ['../o-nas.html', '/zespol-fundacji-firma-dla-kazdego/'],
    ['../blog.html', '/blog/'],
    ['../faq.html', '/faq/'],
    ['../kontakt.html', '/kontakt/'],
    ['../inkubator-przedsiebiorczosci.html', '/inkubator-przedsiebiorczosci/'],
    ['../inne-uslugi.html', '/inne-uslugi/'],
];

function replaceAll(str, search, replace) {
    return str.split(search).join(replace);
}

files.forEach(filepath => {
    let content = fs.readFileSync(filepath, 'utf8');
    const original = content;

    // 1. Domain replacement
    content = replaceAll(content, 'fdk-site.vercel.app', 'firmadlakazdego.pl');

    // 2. Fix hreflang/canonical trailing slashes
    content = content.replace(/href="(https:\/\/firmadlakazdego\.pl(?:\/[^"]*)?)"/, function(match, url) {
        // Apply to all matching URLs
        return match;
    });
    // More targeted: fix URLs that don't end with / and don't have a file extension
    content = content.replace(/href="(https:\/\/firmadlakazdego\.pl\/[^"]*?)"/g, function(match, url) {
        if (url.endsWith('/') || url.split('/').pop().includes('.')) return match;
        return `href="${url}/"`;
    });
    // Fix bare domain
    content = content.replace(/href="https:\/\/firmadlakazdego\.pl"/g, 'href="https://firmadlakazdego.pl/"');

    // 3. Bootstrap async
    content = replaceAll(content, bootstrapOld, bootstrapNew);

    // 4. Nav link replacements
    replacements.forEach(([old, newVal]) => {
        content = replaceAll(content, `href="${old}"`, `href="${newVal}"`);
    });

    // 5. UK internal links - convert href="/uk/pagename" to href="/uk/pagename/"
    content = content.replace(/href="\/uk\/([^"/#]+)"/g, 'href="/uk/$1/"');

    // 6. Blog post links from blog.html: href="../blog/xxx.html" -> href="/uk/blog/xxx/"
    content = content.replace(/href="\.\.\/blog\/([^"]+)\.html"/g, 'href="/uk/blog/$1/"');

    // 7. Remove target="_blank" from internal links
    // Internal links start with / or #
    content = content.replace(/(<a\s[^>]*href="[/#][^"]*"[^>]*?)\s+target="_blank"/g, '$1');
    // Handle target="_blank" before href
    content = content.replace(/(<a\s[^>]*)target="_blank"\s+([^>]*href="[/#][^"]*")/g, '$1$2');

    if (content !== original) {
        fs.writeFileSync(filepath, content, 'utf8');
        console.log(`  Updated: ${path.relative(base, filepath)}`);
    } else {
        console.log(`  No changes: ${path.relative(base, filepath)}`);
    }
});

console.log('\nDone!');
