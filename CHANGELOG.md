# Changelog

Dated entries, newest first.

## 2026-09-20

- A project is opted in, never found: `path` names a directory, and a pattern is refused. A declaration that resolved against the filesystem meant what a run checked depended on what the tree held at that moment, so two tools at two commits could check different things and a directory created today arrived as a failed check rather than as a decision. `ignore-files` keeps its patterns, since those match paths rather than discovering projects.
- The format says where `manifest` and `changelog` are found: inside each project's own directory. A `path` that is not a directory now fails the run, so an entry left behind by a rename is heard about.

## 2026-09-19

- `declared-plugins` joins the drafts: a repository names the agent plugins its release workflow expects, in the place the agent already reads. `node bin/adopt.mjs` writes a starter `.releasetools.yaml` and prints the commands that declare them: `claude plugin install <name>@<marketplace> --scope project` writes the repository's own configuration, and `codex plugin add` does the same for Codex. The clients write their own settings; a script editing them by hand gets the merge wrong on the day it matters.
- The configuration file is `.releasetools.yaml`, and it opens with a comment naming these conventions, so somebody who finds one in a repository can tell what reads it.
- `backport-tag` joins the drafts: a release older than the newest one is published under a mutable tag naming its line, `backport-1`, and never under `latest`. Publishing 1.2.4 as `latest` after 2.0.0 hands the older code to everybody who asked for no version at all, and nothing about what they receive says they were downgraded.
- `changelog-per-change` joins them too, naming the rule the changelog guard checks: every change a reader can observe writes its own entry, in the change that makes it. Written at release time instead, an entry is written by whoever cut the release, from a diff, about work they may not have done, and what comes out is the diff restated.
- The file says how a release is cut: the branch it comes from, the workflow that has to be green on the commit a tag will name, the workflow a tag starts, and a registry URL that must answer 404 for a version nobody released. The registry check is optional, because not every registry answers that question. The tag's shape stays where it already was: a release declares what is its own and nothing that is settled elsewhere.
- A project declares `bump`, the command that sets its version, with `{version}` where the version goes: `uv version {version}`, `npm version {version} --no-git-tag-version`, `cargo set-version {version}`. Every ecosystem ships one, so nothing has to write a manifest it was not told how to write, and a release that coordinates several projects runs what each declared.
- The format says which YAML the file is written in: mappings, lists, scalars and flow lists of scalars, and a tool may refuse anything else as long as it says which line. One reader serves the guards and the release-notes plugin, and a subset both can parse is what keeps them from disagreeing about a file.
- The format says what `.releasetools.yaml` declares beyond the exception list: the projects a repository holds, where each keeps its version and changelog, and which files do not count as a project changing. Guards read it instead of taking their configuration from a workflow.
- The README gains a Guide: what a good release note reads like, which no tool can check. Write for somebody deciding whether to upgrade, name the symptom rather than the cause, one test decides whether there is a note at all, and a breaking change owes more.
- The format settles two of its open questions. A version is compared by semantic versioning's own rules, so a pre-release precedes the release it names. A published release is not withdrawn: one found to be wrong is superseded, and the superseding section says so.
- It gains how a version is judged: the baseline is the newest tag reachable from the commit, which is what keeps a backport on another line from being mistaken for the last release, and the version being judged has to reach the baseline plus the largest increment its types imply, not match it exactly.
- `typed-change`, `semver-versions`, `bump-from-type` and `breaking-says-how` join `note-or-none` as drafts. Conventional Commits supplies the type, semver supplies the arithmetic, and the `BREAKING CHANGE:` footer supplies the one thing Keep a Changelog has no slot for.
- The format settles the block tag as `release-note` with `NONE`, and says the block carries prose only: the type, the scope and the breaking marker are read from the subject, so nothing is declared twice. It gains the type table, the version and tag rules, the changelog shape, and what generated release notes must begin with.
- First shape: README, index, format proposal, entry template, and `note-or-none` as a draft convention.
