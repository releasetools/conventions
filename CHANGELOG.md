# Changelog

Dated entries, newest first.

## 2026-09-19

- `typed-change`, `semver-versions`, `bump-from-type` and `breaking-says-how` join `note-or-none` as drafts. Conventional Commits supplies the type, semver supplies the arithmetic, and the `BREAKING CHANGE:` footer supplies the one thing Keep a Changelog has no slot for.
- The format settles the block tag as `release-note` with `NONE`, and says the block carries prose only: the type, the scope and the breaking marker are read from the subject, so nothing is declared twice. It gains the type table, the version and tag rules, the changelog shape, and what generated release notes must begin with.
- First shape: README, index, format proposal, entry template, and `note-or-none` as a draft convention.
