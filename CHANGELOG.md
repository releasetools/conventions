# Changelog

Dated entries, newest first.

## 2026-09-19

- `backport-tag` joins the drafts: a release older than the newest one is published under a mutable tag naming its line, `backport-1`, and never under `latest`. Publishing 1.2.4 as `latest` after 2.0.0 hands the older code to everybody who asked for no version at all, and nothing about what they receive says they were downgraded.
- `changelog-per-change` joins them too, naming the rule the changelog guard checks: every change a reader can observe writes its own entry, in the change that makes it. Written at release time instead, an entry is written by whoever cut the release, from a diff, about work they may not have done, and what comes out is the diff restated.
- The format says what `.releasetools.yml` declares beyond the exception list: the projects a repository holds, where each keeps its version and changelog, and which files do not count as a project changing. Guards read it instead of taking their configuration from a workflow.
- The README gains a Guide: what a good release note reads like, which no tool can check. Write for somebody deciding whether to upgrade, name the symptom rather than the cause, one test decides whether there is a note at all, and a breaking change owes more.
- The format settles two of its open questions. A version is compared by semantic versioning's own rules, so a pre-release precedes the release it names. A published release is not withdrawn: one found to be wrong is superseded, and the superseding section says so.
- It gains how a version is judged: the baseline is the newest tag reachable from the commit, which is what keeps a backport on another line from being mistaken for the last release, and the version being judged has to reach the baseline plus the largest increment its types imply, not match it exactly.
- `typed-change`, `semver-versions`, `bump-from-type` and `breaking-says-how` join `note-or-none` as drafts. Conventional Commits supplies the type, semver supplies the arithmetic, and the `BREAKING CHANGE:` footer supplies the one thing Keep a Changelog has no slot for.
- The format settles the block tag as `release-note` with `NONE`, and says the block carries prose only: the type, the scope and the breaking marker are read from the subject, so nothing is declared twice. It gains the type table, the version and tag rules, the changelog shape, and what generated release notes must begin with.
- First shape: README, index, format proposal, entry template, and `note-or-none` as a draft convention.
