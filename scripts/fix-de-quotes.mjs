import fs from 'node:fs';

const p = 'src/messages/de.json';
let s = fs.readFileSync(p, 'utf8');

// Restore damaged JSON string delimiters: a typographic quote directly before ",\n" or "\n"
// at the end of a value line was the original ASCII closing " that the first regex ate.
let fixes = [];
s = s.replace(/([“”‘’]),(\r?\n)/g, (m, q, comma, nl) => {
  fixes.push(q);
  return '"' + comma + nl;
});
s = s.replace(/([“”‘’])(\r?\n)/g, (m, q, nl) => {
  fixes.push(q);
  return '"' + nl;
});
console.log('restored line-end delimiters:', fixes.length);

// Drop the previously added German single-quote close only where it now sits inside a value (keep JSON valid);
// our first script already converted ‚...' -> ‚...‘ which is fine inside JSON strings, no action needed.

fs.writeFileSync(p, s);

try {
  JSON.parse(s);
  console.log('de JSON OK');
} catch (e) {
  console.log('de JSON STILL BROKEN:', e.message);
}
