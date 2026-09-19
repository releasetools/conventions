---
name: changelog-per-release
status: draft
checked_by: []
superseded_by: null
---

# changelog-per-release

Every released version has a changelog section, written in the change that earns it.

## Why

The reader is on the previous version, deciding whether this one affects them. A compare link asks them to read a diff to answer that, which is the work the release was supposed to do for them.

Written in the change, rather than at release time, because that is when somebody still knows why. A week later the reason not to take the obvious approach is gone from everybody's head and cannot be recovered from the diff, and what gets written instead is the diff restated.

## Examples

Good:

```markdown
## 0.4.2 - 2026-09-19

### Fixed

Removing a worktree no longer deletes ignored files. It used to remove
them at exit 0 and without a word, so a `.env` beside the checkout was
gone with it.
```

Bad:

```markdown
## 0.4.2 - 2026-09-19

### Fixed

Fixed worktree handling.
```

Bad, in that there is nothing to read at all:

```
Compare: v0.4.1...v0.4.2
```

## Notes

A project that keeps no changelog owes no section, and a repository declares which projects keep one. A version that moved without a section is the failure this names; a section for a version nothing released is harmless and is not checked.

The shape of a section, its heading and its ordering are in [FORMAT.md](../FORMAT.md). What a good entry says is in the [guide](../README.md#guide).
