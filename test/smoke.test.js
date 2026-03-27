const fs = require('fs');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const index = fs.readFileSync('index.html', 'utf8');
const manifest = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));
const sw = fs.readFileSync('sw.js', 'utf8');

assert(index.includes('id="startBtn"'), 'Missing START button');
assert(index.includes('id="openSettingsBtn"'), 'Missing settings toggle button');
assert(index.includes('id="settingsModal"'), 'Missing settings panel');
assert(index.includes('SpeechSynthesisUtterance'), 'Missing speech synthesis announcement');
assert(index.includes('navigator.vibrate'), 'Missing haptics support');
assert(index.includes('const PHASES = ['), 'Missing phase configuration');
assert(index.includes('customIntervals'), 'Missing custom interval persistence support');

assert(manifest.name === 'Run Timer', 'Manifest name should be "Run Timer"');
assert(manifest.display === 'standalone', 'Manifest display should be standalone');
assert(Boolean(manifest.icons && manifest.icons.length), 'Manifest should include icons');

assert(sw.includes('caches.open'), 'Service worker should cache assets');
assert(sw.includes('self.addEventListener(\'fetch\''), 'Service worker should handle fetch events');

console.log('Smoke checks passed');
