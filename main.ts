// Driver for the markdown-render-speed-02 entry.
//
// The harness runs `node /bot/main.ts`. The program reads the case set from
// /input/cases.json (a JSON array of {id, markdown}), renders every case on
// its own with parse() from ./parse.js, and writes the HTML strings, in the
// cases' order, as a JSON array to /output/html.json. Outside the sandbox,
// MAKEFUN_INPUT_DIR and MAKEFUN_OUTPUT_DIR stand in for /input and /output,
// the same convention the kit's scorer and baseline use.

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from './parse.js';

interface Case {
  id: string;
  markdown: string;
}

const inputDir = process.env.MAKEFUN_INPUT_DIR ?? '/input';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const raw = readFileSync(join(inputDir, 'cases.json'), 'utf8');
const cases = JSON.parse(raw) as Case[];

const html = new Array<string>(cases.length);
for (let i = 0; i < cases.length; i++) {
  html[i] = parse(cases[i]!.markdown);
}

writeFileSync(join(outputDir, 'html.json'), JSON.stringify(html));
