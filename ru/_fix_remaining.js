// Node.js script to apply remaining changes
const fs = require('fs');
const path = require('path');
const glob = require('path');

const baseDir = __dirname;

// Get all blog HTML files
const blogDir = path.join(baseDir, 'blog');
const blogFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.html')).map(f => path.join(blogDir, f));

// Get all main HTML files
const mainFiles = fs.readdirSync(baseDir).filter(f => f.endsWith('.html')).map(f => path.join(baseDir, f));

const allFiles = [...mainFiles, ...blogFiles];

// Blog post replacements (../../ paths)
const blogReplacements = [
    ['href="../../faq.html"', 'href="/faq/"'],
    ['href="../../blog.html"', 'href="/blog/"'],
    ['href="../../o-nas.html"', 'href="/zespol-fundacji-firma-dla-kazdego/"'],
    ['href="../../dla-pracodawcow.html"', 'href="/dla-pracodawcow/"'],
    ['href="../../cudzoziemcy.html"', 'href="/cudzoziemcy/"'],
    ['href="../../inne-branze.html"', 'href="/inkubator-przedsiebiorczosci/"'],
    ['href="../../muzycy.html"', 'href="/muzycy/"'],
    ['href="../../tlumacze.html"', 'href="/tlumacze-lektorzy/"'],
    ['href="../../architekci.html"', 'href="/architekci/"'],
    ['href="../../ecommerce.html"', 'href="/e-commerce/"'],
    ['href="../../programisci.html"', 'href="/programisci-graficy/"'],
    ['href="../../index.html"', 'href="/"'],
];

// Blog post links in blog.html
function fixBlogPostLinks(content) {
    return content.replace(/href="\.\.\/blog\/([\w-]+)\.html"/g, 'href="/blog/$1/"');
}

// Fix hreflang/canonical/og:url trailing slashes
function fixTrailingSlashes(content) {
    // Match hreflang URLs without trailing slash
    content = content.replace(/(hreflang="[^"]*"\s+href="https:\/\/firmadlakazdego\.pl\/[^"]*?[^\/])("\s*\/>)/g, '$1/$2');
    // Match canonical URLs without trailing slash
    content = content.replace(/(rel="canonical"\s+href="https:\/\/firmadlakazdego\.pl\/[^"]*?[^\/])(")/g, '$1/$2');
    // Match og:url without trailing slash
    content = content.replace(/(property="og:url"\s+content="https:\/\/firmadlakazdego\.pl\/[^"]*?[^\/])(")/g, '$1/$2');
    // Match og:image - should NOT get trailing slash (it's a file)
    // Already handled since og:image URLs end in .png
    return content;
}

// Remove target="_blank" from internal links
function removeTargetBlank(content) {
    return content.replace(/(href="(?:\/|#|\.\/)(?:[^"]*)")\s+target="_blank"/g, '$1');
}

let updatedCount = 0;
for (const filepath of allFiles) {
    let content = fs.readFileSync(filepath, 'utf-8');
    const original = content;

    // Apply blog replacements to blog files
    if (filepath.includes('blog' + path.sep) || filepath.includes('blog/')) {
        for (const [old, newStr] of blogReplacements) {
            while (content.includes(old)) {
                content = content.replace(old, newStr);
            }
        }
    }

    // Fix blog post links in blog.html
    content = fixBlogPostLinks(content);

    // Fix hreflang/canonical/og:url trailing slashes
    content = fixTrailingSlashes(content);

    // Remove target="_blank" from internal links
    content = removeTargetBlank(content);

    if (content !== original) {
        fs.writeFileSync(filepath, content, 'utf-8');
        console.log('Updated:', path.relative(baseDir, filepath));
        updatedCount++;
    }
}

console.log('\nTotal files updated:', updatedCount);
console.log('Done!');
