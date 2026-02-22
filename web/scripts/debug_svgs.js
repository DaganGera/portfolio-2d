const { SPRITES } = require('./src/assets.js');

function testSvg(name, svg) {
    try {
        const b64 = btoa(svg);
        console.log(`[OK] ${name} encoded cleanly. Length: ${b64.length}`);
    } catch (e) {
        console.error(`[ERROR] ${name} failed to encode! =>`, e.message);
    }
}

Object.keys(SPRITES).forEach(k => testSvg(k, SPRITES[k]));
