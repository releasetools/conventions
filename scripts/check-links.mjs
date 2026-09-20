#!/usr/bin/env node
/*
 * Check that every relative link in this repository's markdown resolves.
 *
 * Inline links, written [text](target). A target carrying a fragment has that
 * fragment checked against the headings of the file it names. External URLs
 * are not fetched, reference-style links are not read, and a link inside a
 * fenced code block is an example rather than a link.
 *
 *   node scripts/check-links.mjs
 */

import fs from 'node:fs';
import path from 'node:path';

const SKIP = new Set(['node_modules', '.git']);
const LINK = /\[[^\]]*\]\(([^)\s]+)\)/g;
const FENCE = /^\s*(```|~~~)/;

function main(root) {
  const broken = [];
  for (const file of markdown(root)) {
    broken.push(...check(file));
  }
  for (const line of broken) {
    console.error(line);
  }
  console.log(`${broken.length} broken links`);
  return broken.length === 0 ? 0 : 1;
}

function* markdown(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(entry.name)) {
      continue;
    }
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* markdown(full);
    } else if (entry.name.endsWith('.md')) {
      yield full;
    }
  }
}

function check(file) {
  const broken = [];
  let fenced = false;
  let number = 0;
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    number += 1;
    if (FENCE.test(line)) {
      fenced = !fenced;
      continue;
    }
    if (fenced) {
      continue;
    }
    for (const [, target] of line.matchAll(LINK)) {
      const reason = why(file, target);
      if (reason) {
        broken.push(`${file}:${number} ${target} ${reason}`);
      }
    }
  }
  return broken;
}

/** Why a target does not resolve, or null when it does. */
function why(file, target) {
  if (/^[a-z][a-z0-9+.-]*:/i.test(target) || target.startsWith('//')) {
    return null;
  }
  const [route, fragment] = target.split('#');
  const named = route ? path.resolve(path.dirname(file), route) : file;
  if (!fs.existsSync(named)) {
    return 'names nothing';
  }
  if (!fragment || !fs.statSync(named).isFile()) {
    return null;
  }
  return anchors(named).includes(fragment) ? null : 'has no such heading';
}

/** The headings of a markdown file, slugged the way GitHub links to them. */
function anchors(file) {
  return fs
    .readFileSync(file, 'utf8')
    .split('\n')
    .filter((line) => line.startsWith('#'))
    .map((line) =>
      line
        .replace(/^#+\s*/, '')
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .trim()
        .replace(/ +/g, '-'),
    );
}

process.exit(main(process.cwd()));
