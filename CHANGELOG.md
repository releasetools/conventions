# Changelog

Dated entries, newest first.

## 2026-09-19

- The README gains a Guide: what a good release note reads like, which no tool can check. Write for somebody deciding whether to upgrade, name the symptom rather than the cause, one test decides whether there is a note at all, and a breaking change owes more.
- The format settles two of its open questions. A version is compared by semantic versioning's own rules, so a pre-release precedes the release it names. A published release is not withdrawn: one found to be wrong is superseded, and the superseding section says so.
- It gains how a version is judged: the baseline is the newest tag reachable from the commit, which is what keeps a backport on another line from being mistaken for the last release, and the version being judged has to reach the baseline plus the largest increment its types imply, not match it exactly.
- `typed-change`, `semver-versions`, `bump-from-type` and `breaking-says-how` join `note-or-none` as drafts. Conventional Commits supplies the type, semver supplies the arithmetic, and the `BREAKING CHANGE:` footer supplies the one thing Keep a Changelog has no slot for.
- The format settles the block tag as `release-note` with `NONE`, and says the block carries prose only: the type, the scope and the breaking marker are read from the subject, so nothing is declared twice. It gains the type table, the version and tag rules, the changelog shape, and what generated release notes must begin with.
- First shape: README, index, format proposal, entry template, and `note-or-none` as a draft convention.
