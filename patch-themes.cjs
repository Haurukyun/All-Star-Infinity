const fs = require('fs');
const path = require('path');

const themesDir = path.join(__dirname, 'src', 'themes');
const files = fs.readdirSync(themesDir).filter(f => f.endsWith('Theme.tsx'));

let totalUpdated = 0;

for (const file of files) {
    const filePath = path.join(themesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Make sure we have the missing labels appended into themeLabels
    if (content.includes('const themeLabels')) {
        let changed = false;

        if (!content.includes('[Theme.UNDERTALE]')) {
            content = content.replace(/(const themeLabels.*?\{[\s\S]*?)(};)/m, "$1        [Theme.UNDERTALE]: 'UNDERTALE',\n    $2");
            changed = true;
        }
        if (!content.includes('[Theme.FALLOUT]')) {
            content = content.replace(/(const themeLabels.*?\{[\s\S]*?)(};)/m, "$1        [Theme.FALLOUT]: 'FALLOUT',\n    $2");
            changed = true;
        }
        if (!content.includes('[Theme.HAZBIN]')) {
            content = content.replace(/(const themeLabels.*?\{[\s\S]*?)(};)/m, "$1        [Theme.HAZBIN]: 'HAZBIN HOTEL',\n    $2");
            changed = true;
        }

        if (changed) {
            fs.writeFileSync(filePath, content, 'utf8');
            totalUpdated++;
            console.log(`Updated ${file}`);
        }
    }
}

console.log(`Finished patching themeLabels in ${totalUpdated} files.`);
