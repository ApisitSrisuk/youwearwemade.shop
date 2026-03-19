import fs from 'fs';
const data = fs.readFileSync('output.txt', 'utf16le');
fs.writeFileSync('output_utf8.txt', data, 'utf8');
