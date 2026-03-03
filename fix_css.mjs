import fs from 'fs';

const files = [
    'src/themes/ArcaneTheme.tsx',
    'src/themes/FnafTheme.tsx',
    'src/themes/IrumaTheme.tsx',
    'src/themes/VocaloidTheme.tsx'
];

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');

    content = content.replace(/background - (image|position|size|color)/g, 'background-$1');
    content = content.replace(/mix - blend - mode/g, 'mix-blend-mode');
    content = content.replace(/pointer - events/g, 'pointer-events');
    content = content.replace(/z - index/g, 'z-index');
    content = content.replace(/transform - origin/g, 'transform-origin');
    content = content.replace(/border - radius/g, 'border-radius');
    content = content.replace(/border - bottom/g, 'border-bottom');
    content = content.replace(/border - top/g, 'border-top');
    content = content.replace(/border - left/g, 'border-left');
    content = content.replace(/border - right/g, 'border-right');
    content = content.replace(/repeating - linear - gradient/g, 'repeating-linear-gradient');
    content = content.replace(/linear - gradient/g, 'linear-gradient');
    content = content.replace(/radial - gradient/g, 'radial-gradient');
    content = content.replace(/\.fnaf - /g, '.fnaf-');
    content = content.replace(/\.arcane - /g, '.arcane-');
    content = content.replace(/\.iruma - /g, '.iruma-');
    content = content.replace(/\.vocaloid - /g, '.vocaloid-');
    content = content.replace(/\.wing - /g, '.wing-');

    fs.writeFileSync(file, content);
    console.log('Fixed CSS spacing in', file);
}
