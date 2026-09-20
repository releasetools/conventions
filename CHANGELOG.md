# Changelog

Dated entries, newest first.

## 2026-09-20

- `shipped-only` says what it means in a repository that has never tagged. There is no baseline, so the convention does
  not apply: somebody is running the branch because that is the only thing there is to run, and a fix to it is a `fix`.
  It starts mattering at the first tag.
- The README is an index: what a convention is, how to adopt one, and where everything else lives. What a good release
  note reads like is in [`guides/release-notes.md`](guides/release-notes.md), and `guides/README.md` carries the guides'
  own index, their provenance, and the rule about serving files from a `.github` repository.
- The entry template is `templates/convention.md`, so every file in `conventions/` is a convention and an `except` name
  matches one of them. `AGENTS.md` says where the template is and what adding a convention involves.
- Prose wraps at 120 characters, and Prettier both applies it and checks it: `npm run format` rewraps, `npm run lint`
  fails on a file that drifted, and the version is pinned in `package.json`. The rule in `guides/docs-style.md` is
  enforced rather than remembered.
- `guides/` joins the repository: six short guides for running one, on pull requests, reviewing, issues, AI-assisted
  contributions, security reports and markdown. They are cut down from the Kubernetes contributor guide, which
  coordinates thousands of maintainers and carries machinery none of these repositories need. They are prose, so nothing
  checks them and nothing excepts them.
- `shipped-only` joins the drafts: a change that fixes something no released version carried takes a type that observes
  nothing. Typed `fix`, a regression introduced and fixed between two tags increments the patch and writes an entry
  about a problem nobody could have hit. The baseline that decides it is the one "Judging a version" already defines.
- The block and the changelog entry are separate declarations and may differ on purpose. The block is what one change
  claims about itself and a guard reads it there; what a release publishes comes from the changelog, where an entry can
  be rewritten as the version takes shape without reopening a merged change.
- Generated release notes render a version's entries as a flat list. The changelog groups them under `###` headings
  because it holds every version at once; a release note holds one, and the headings buy nothing there.
- A project is opted in, never found: `path` names a directory, and a pattern is refused. A declaration that resolved
  against the filesystem meant what a run checked depended on what the tree held at that moment, so two tools at two
  commits could check different things and a directory created today arrived as a failed check rather than as a
  decision. `ignore-files` keeps its patterns, since those match paths rather than discovering projects.
- `manifest` is required, and a project names every file that carries its version: `.claude-plugin/plugin.json` and
  `.codex-plugin/plugin.json` are one project keeping it in two places, and both have to say the same thing. Which files
  a version can be read out of is written down rather than guessed at.
- A tool that needs the file and does not find one says so and stops. A guessed project is reported on as though
  somebody had asked for it.
- The format says where `manifest` and `changelog` are found: inside each project's own directory. A `path` that is not
  a directory now fails the run, so an entry left behind by a rename is heard about.

## 2026-09-19

- `declared-plugins` joins the drafts: a repository names the agent plugins its release workflow expects, in the place
  the agent already reads. `node bin/adopt.mjs` writes a starter `.releasetools.yaml` and prints the commands that
  declare them: `claude plugin install <name>@<marketplace> --scope project` writes the repository's own configuration,
  and `codex plugin add` does the same for Codex. The clients write their own settings; a script editing them by hand
  gets the merge wrong on the day it matters.
- The configuration file is `.releasetools.yaml`, and it opens with a comment naming these conventions, so somebody who
  finds one in a repository can tell what reads it.
- `backport-tag` joins the drafts: a release older than the newest one is published under a mutable tag naming its line,
  `backport-1`, and never under `latest`. Publishing 1.2.4 as `latest` after 2.0.0 hands the older code to everybody who
  asked for no version at all, and nothing about what they receive says they were downgraded.
- `changelog-per-change` joins them too, naming the rule the changelog guard checks: every change a reader can observe
  writes its own entry, in the change that makes it. Written at release time instead, an entry is written by whoever cut
  the release, from a diff, about work they may not have done, and what comes out is the diff restated.
- The file says how a release is cut: the branch it comes from, the workflow that has to be green on the commit a tag
  will name, the workflow a tag starts, and a registry URL that must answer 404 for a version nobody released. The
  registry check is optional, because not every registry answers that question. The tag's shape stays where it already
  was: a release declares what is its own and nothing that is settled elsewhere.
- A project declares `bump`, the command that sets its version, with `{version}` where the version goes:
  `uv version {version}`, `npm version {version} --no-git-tag-version`, `cargo set-version {version}`. Every ecosystem
  ships one, so nothing has to write a manifest it was not told how to write, and a release that coordinates several
  projects runs what each declared.
- The format says which YAML the file is written in: mappings, lists, scalars and flow lists of scalars, and a tool may
  refuse anything else as long as it says which line. One reader serves the guards and the release-notes plugin, and a
  subset both can parse is what keeps them from disagreeing about a file.
- The format says what `.releasetools.yaml` declares beyond the exception list: the projects a repository holds, where
  each keeps its version and changelog, and which files do not count as a project changing. Guards read it instead of
  taking their configuration from a workflow.
- The README gains a Guide: what a good release note reads like, which no tool can check. Write for somebody deciding
  whether to upgrade, name the symptom rather than the cause, one test decides whether there is a note at all, and a
  breaking change owes more.
- The format settles two of its open questions. A version is compared by semantic versioning's own rules, so a
  pre-release precedes the release it names. A published release is not withdrawn: one found to be wrong is superseded,
  and the superseding section says so.
- It gains how a version is judged: the baseline is the newest tag reachable from the commit, which is what keeps a
  backport on another line from being mistaken for the last release, and the version being judged has to reach the
  baseline plus the largest increment its types imply, not match it exactly.
- `typed-change`, `semver-versions`, `bump-from-type` and `breaking-says-how` join `note-or-none` as drafts.
  Conventional Commits supplies the type, semver supplies the arithmetic, and the `BREAKING CHANGE:` footer supplies the
  one thing Keep a Changelog has no slot for.
- The format settles the block tag as `release-note` with `NONE`, and says the block carries prose only: the type, the
  scope and the breaking marker are read from the subject, so nothing is declared twice. It gains the type table, the
  version and tag rules, the changelog shape, and what generated release notes must begin with.
- First shape: README, index, format proposal, entry template, and `note-or-none` as a draft convention.
