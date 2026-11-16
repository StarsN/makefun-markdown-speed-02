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
//
// Batch 1 (in vendor/marked/marked.esm.js, all behavior-preserving):
// first-character dispatch guards on the block and inline tokenizers (a
// tokenizer whose pattern cannot match the current first character returns
// before its regex runs), a delimiter scan that skips the table and setext
// regexes when no delimiter/underline line exists, mask fast paths in the
// inline lexer (no reflink pass when no link definitions exist, no code-span
// masking when the text holds no backtick, bracket or angle bracket, no
// mask bookkeeping at all when the text holds no emphasis delimiter), a
// tab-free fast path in the indent expander, and a CR check before the
// line-ending normalization replace.

import { marked } from './vendor/marked/marked.esm.js';

/** The HTML marked renders for `markdown`, with marked's defaults. */
export function parse(markdown) {
  return marked.parse(markdown);
}
