// Run: node _fix_uk_remaining.js
// Fixes remaining items across all uk/*.html and uk/blog/*.html files:
// 1. /uk/xxx nav links -> add trailing slash
// 2. hreflang/canonical/og:url URLs -> add trailing slash
// 3. Any remaining ../xxx.html patterns in non-index files
const fs = require('fs');
const path = require('path');
const base = __dirname;
const ukDir = path.join(base, 'uk');
const blogDir = path.join(base, 'uk', 'blog');
let files = fs.readdirSync(ukDir).filter(f => f.endsWith('.html')).map(f => path.join(ukDir, f));
if (fs.existsSync(blogDir)) {
    files = files.concat(fs.readdirSync(blogDir).filter(f => f.endsWith('.html')).map(f => path.join(blogDir, f)));
}
console.log('Processing ' + files.length + ' files...');
let totalChanges = 0;
files.forEach(filepath => {
    let content = fs.readFileSync(filepath, 'utf8');
    const original = content;

    // 1. /uk/xxx links trailing slash (not /uk/#xxx, not /uk/xxx/ already, not /uk/)
    content = content.replace(/href="\/uk\/([^"/#]+)"/g, 'href="/uk/$1/"');

    // 2. hreflang/canonical/og:url trailing slashes
    // URLs like firmadlakazdego.pl/something without trailing slash and without file extension
    content = content.replace(/(href|content)="(https:\/\/firmadlakazdego\.pl\/[^"]*?)"/g, function(match, attr, url) {
        if (url.endsWith('/') || url.split('/').pop().includes('.')) return match;
        return attr + '="' + url + '/"';
    });

    // 3. Fix bare domain without trailing slash
    content = content.replace(/(href|content)="https:\/\/firmadlakazdego\.pl"/g, '$1="https://firmadlakazdego.pl/"');

    // 4. Any remaining ../blog/xxx.html patterns
    content = content.replace(/href="\.\.\/blog\/([^"]+)\.html"/g, 'href="/uk/blog/$1/"');

    if (content !== original) {
        fs.writeFileSync(filepath, content, 'utf8');
        totalChanges++;
        console.log('  Updated: ' + path.relative(base, filepath));
    } else {
        console.log('  No changes: ' + path.relative(base, filepath));
    }
});
console.log('\nDone! Updated ' + totalChanges + ' files.');
