#!/usr/bin/env node
/*
 * Adopt the releasetools conventions in a repository.
 *
 * Writes the declaration every releasetools tool reads, `.releasetools.yaml`,
 * and prints the commands that declare the plugins the workflow expects. The
 * clients write their own configuration: a script that edits somebody's
 * settings by hand gets the merge wrong on the day it matters.
 *
 *   node bin/adopt.mjs [--dir <path>] [--plugin <name>@<marketplace>]...
 */

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

/** Marketplaces this knows by name, so a plugin can be named on its own. */
const MARKETPLACES = {
  'release-tools': 'releasetools/agent-plugins',
  mihaibojin: 'MihaiBojin/agent-plugins',
};

const DEFAULT_PLUGINS = ['release-notes@release-tools'];

/** The manifests a starter declaration can name, in the order they are tried. */
const MANIFESTS = ['package.json', 'pyproject.toml', 'Cargo.toml', 'VERSION'];

const HEADER = `# How this repository releases, read by every releasetools tool.
#
# Conventions: https://github.com/releasetools/conventions
# Tools:       https://github.com/releasetools
`;

function main(argv) {
  const options = read(argv);
  const root = repositoryRoot(options.dir);

  console.log(writeConfig(root));
  console.log('');
  console.log(declare(options.plugins));
  return 0;
}

function read(argv) {
  const options = { dir: process.cwd(), plugins: [] };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === '--dir') {
      options.dir = argv[(index += 1)];
    } else if (argument === '--plugin') {
      options.plugins.push(argv[(index += 1)]);
    } else if (argument === '--help' || argument === '-h') {
      console.log('node bin/adopt.mjs [--dir <path>] [--plugin <name>@<marketplace>]...');
      process.exit(0);
    } else {
      throw new Error(`unknown argument '${argument}'`);
    }
  }
  if (options.plugins.length === 0) {
    options.plugins = DEFAULT_PLUGINS;
  }
  return options;
}

function repositoryRoot(dir) {
  try {
    return execFileSync('git', ['rev-parse', '--show-toplevel'], {
      cwd: dir,
      encoding: 'utf8',
    }).trim();
  } catch {
    return path.resolve(dir);
  }
}

/** A starter declaration, describing what is actually in the repository. */
function writeConfig(root) {
  const file = path.join(root, '.releasetools.yaml');
  if (fs.existsSync(file)) {
    return '.releasetools.yaml is already there';
  }

  const skipped = [];
  let manifest = null;
  for (const name of MANIFESTS) {
    const candidate = path.join(root, name);
    if (!fs.existsSync(candidate)) {
      continue;
    }
    if (versionIn(candidate)) {
      manifest = name;
      break;
    }
    skipped.push(name);
  }

  const changelog = fs.existsSync(path.join(root, 'CHANGELOG.md')) ? 'CHANGELOG.md' : null;
  const lines = [HEADER, 'projects:', '  - path: ./'];
  if (manifest) {
    lines.push(`    manifest: ${manifest}`);
  }
  if (changelog) {
    lines.push(`    changelog: ${changelog}`);
  }
  lines.push('', 'conventions:', '  except: []', '');
  fs.writeFileSync(file, lines.join('\n'));

  const report = ['wrote .releasetools.yaml'];
  for (const name of skipped) {
    report.push(`  skipped ${name}, which declares no version`);
  }
  if (!manifest) {
    report.push("  name the file that carries this project's version under manifest:");
  }
  return report.join('\n');
}

/**
 * The version a manifest declares, or null.
 *
 * FORMAT.md says where each kind of file keeps it. One that declares none is
 * not this project's manifest, whatever its name, and naming it would write a
 * declaration no tool can read a version out of.
 */
function versionIn(file) {
  const text = fs.readFileSync(file, 'utf8');
  if (file.endsWith('.json')) {
    try {
      return JSON.parse(text).version ?? null;
    } catch {
      return null;
    }
  }
  if (file.endsWith('.toml')) {
    return text.match(/^\s*version\s*=\s*['"]([^'"]+)['"]/m)?.[1] ?? null;
  }
  return text.trim() || null;
}

/**
 * The commands that declare the plugins, for the clients to run.
 *
 * `--scope project` writes the repository's own configuration rather than the
 * person's, which is the point: the toolchain belongs to the repository, and
 * the next contributor is offered the same plugins.
 */
function declare(plugins) {
  const marketplaces = [...new Set(plugins.map(named))];
  const lines = ['Declare the plugins, in the repository, with:', ''];
  for (const marketplace of marketplaces) {
    lines.push(`  claude plugin marketplace add ${MARKETPLACES[marketplace]} --scope project`);
  }
  for (const plugin of plugins) {
    lines.push(`  claude plugin install ${plugin} --scope project`);
  }
  lines.push('', 'Codex keeps its plugins in its own configuration rather than the', "repository's:", '');
  for (const plugin of plugins) {
    lines.push(`  codex plugin add ${plugin}`);
  }
  return lines.join('\n');
}

function named(plugin) {
  const marketplace = plugin.split('@')[1];
  if (!marketplace) {
    throw new Error(`'${plugin}' needs a marketplace: <name>@<marketplace>`);
  }
  if (!MARKETPLACES[marketplace]) {
    throw new Error(
      `marketplace '${marketplace}' is not one this knows; the names are ${Object.keys(MARKETPLACES).join(', ')}`,
    );
  }
  return marketplace;
}

try {
  process.exit(main(process.argv.slice(2)));
} catch (error) {
  console.error(`adopt: ${error.message}`);
  process.exit(1);
}
