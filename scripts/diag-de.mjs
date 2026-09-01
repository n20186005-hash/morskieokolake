import fs from 'node:fs';

const s = fs.readFileSync('src/messages/de.json', 'utf8');
try {
  JSON.parse(s);
  console.log('de JSON OK');
} catch (e) {
  console.log('msg:', e.message);
  const m = /\bat position (\d+)/.exec(e.message);
  const pos = m ? parseInt(m[1]) : -1;
  console.log('around:', JSON.stringify(s.slice(pos - 60, pos + 60)));
}

// locate all ASCII double quotes inside line 28 and print any suspicious ones
const lines = s.split(/\r?\n/);
const l28 = lines[27];
const q = [];
[...l28].forEach((c, i) => {
  if (c === '"') q.push(i);
});
console.log('line28 len', l28.length, 'quote positions:', q.join(','));
// print chars around each quote
for (const i of q) {
  console.log('  q@' + i, JSON.stringify(l28.slice(Math.max(0, i - 15), i + 15)));
}
// count typographic quotes on line 28
console.log('left „ (201E):', [...l28].filter((c) => c === '\u201E').length);
console.log('right “ (201C):', [...l28].filter((c) => c === '\u201C').length);
