#!/usr/bin/env node
/*
 * Adopt the releasetools conventions in a repository.
 *
 * Writes the two declarations an adopter needs: `.releasetools.yaml`, which
 * every releasetools tool reads, and the client configuration that offers the
 * plugins the workflow expects. Both are merged rather than overwritten, so a
 * second run changes nothing.
 *
 *   node bin/adopt.mjs [--dir <path>] [--plugin <name>@<marketplace>]... [--codex]
 */

import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

/** Marketplaces this knows by name, so a plugin can be named on its own. */
const MARKETPLACES = {
  'release-tools': 'releasetools/agent-plugins',
  mihaibojin: 'MihaiBojin/agent-plugins',
};

const DEFAULT_PLUGINS = ['release-notes@release-tools'];

const HEADER = `# How this repository releases, read by every releasetools tool.
#
# Conventions: https://github.com/releasetools/conventions
# Tools:       https://github.com/releasetools
`;

function main(argv) {
  const options = read(argv);
  const root = repositoryRoot(options.dir);
  const done = [];

  done.push(writeConfig(root));
  done.push(writeClaude(root, options.plugins));
  done.push(codex(options.plugins, options.codex));

  for (const line of done.filter(Boolean)) {
    console.log(line);
  }
  return 0;
}

function read(argv) {
  const options = { dir: process.cwd(), plugins: [], codex: false };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === '--dir') {
      options.dir = argv[(index += 1)];
    } else if (argument === '--plugin') {
      options.plugins.push(argv[(index += 1)]);
    } else if (argument === '--codex') {
      options.codex = true;
    } else if (argument === '--help' || argument === '-h') {
      console.log(
        'node bin/adopt.mjs [--dir <path>] [--plugin <name>@<marketplace>]... [--codex]',
      );
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

  const manifest = ['package.json', 'pyproject.toml', 'Cargo.toml', 'VERSION'].find((name) =>
    fs.existsSync(path.join(root, name)),
  );
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
  return 'wrote .releasetools.yaml';
}

/** Claude Code reads this, and offers to install what it does not have. */
function writeClaude(root, plugins) {
  const file = path.join(root, '.claude', 'settings.json');
  const settings = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {};
  const before = JSON.stringify(settings);

  settings.enabledPlugins ??= {};
  settings.extraKnownMarketplaces ??= {};
  for (const plugin of plugins) {
    const marketplace = named(plugin);
    settings.enabledPlugins[plugin] = true;
    settings.extraKnownMarketplaces[marketplace] ??= {
      source: { source: 'github', repo: MARKETPLACES[marketplace] },
    };
  }

  if (JSON.stringify(settings) === before) {
    return '.claude/settings.json already names them';
  }
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(settings, null, 2)}\n`);
  return `wrote .claude/settings.json: ${plugins.join(', ')}`;
}

/**
 * Codex keeps its plugins in its own configuration rather than the
 * repository's, so this is a command to run and not a file to write. It is
 * printed by default: installing into somebody's client is their call.
 */
function codex(plugins, run) {
  const commands = plugins.map((plugin) => `codex plugin add ${plugin}`);
  if (!run) {
    return `for Codex, run:\n  ${commands.join('\n  ')}`;
  }
  if (spawnSync('codex', ['--version'], { stdio: 'ignore' }).status !== 0) {
    return 'codex is not on PATH, so nothing was added to it';
  }
  for (const plugin of plugins) {
    const result = spawnSync('codex', ['plugin', 'add', plugin], { stdio: 'inherit' });
    if (result.status !== 0) {
      return `codex plugin add ${plugin} failed`;
    }
  }
  return `codex: added ${plugins.join(', ')}`;
}

function named(plugin) {
  const marketplace = plugin.split('@')[1];
  if (!marketplace) {
    throw new Error(`'${plugin}' needs a marketplace: <name>@<marketplace>`);
  }
  if (!MARKETPLACES[marketplace]) {
    throw new Error(
      `marketplace '${marketplace}' is not one this knows; the names are ${Object.keys(
        MARKETPLACES,
      ).join(', ')}`,
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
