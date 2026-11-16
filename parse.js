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
//
// Batch 2: link/reflink pre-checks (an inline link needs "](", a reference
// link needs "]"), the list tokenizer reads first lines with indexOf
// instead of split, and its six per-line "begin" regex tests are skipped
// when the line's first significant character cannot start any of them.
// (A hand scanner for the GFM inline text rule was tried and dropped: the
// engine's own regex is faster than a char-by-char JS loop.)
//
// Batch 3: the list tokenizer's trailing-blank-line regex test becomes a
// backward char scan; the emphasis bookkeeping scan uses char codes
// instead of string indexing; the inline token loop dispatches on the
// first character, calling only the tokenizers that can match there
// (same order, same guards, fewer calls).

import { marked } from './vendor/marked/marked.esm.js';

/** The HTML marked renders for `markdown`, with marked's defaults. */
export function parse(markdown) {
  return marked.parse(markdown);
}
