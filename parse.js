// parse(markdown): the HTML for a Markdown string.
//
// This module is the drop-in the competition races: for every input string
// it returns exactly the HTML that marked 18.1.3's marked.parse returns with
// marked's default options (gfm true, breaks false, pedantic false, async
// false). It is a fork of marked 18.1.3, vendored under vendor/marked/ with
// its LICENSE and NOTICE (MIT, MarkedJS); the fork keeps marked's grammar
// and output byte for byte and changes only how fast the work is done.
//
// v1: delegate to the vendored renderer unchanged, so the entry is correct
// by construction. The speed work lands in the vendored fork step by step,
// and every step is re-verified against marked's own output on the full
// practice set before it is kept.

import { marked } from './vendor/marked/marked.esm.js';

/** The HTML marked renders for `markdown`, with marked's defaults. */
export function parse(markdown) {
  return marked.parse(markdown);
}
