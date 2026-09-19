---
name: changelog-per-change
status: draft
checked_by: []
superseded_by: null
---

# changelog-per-change

Every change a reader can observe writes its own changelog entry, in the change that makes it.

## Why

Written at release time, the entry is written by whoever cut the release, from a diff, about work they may not have done. What comes out is the diff restated: "fixed worktree handling", which tells nobody whether it happened to them.

Written in the change, it is written by the person who was there, while they still know why. The reason not to take the obvious approach is in their head that day and nowhere else, and no later reader recovers it from the patch.

It also stops a release being a writing session. Twenty changes batched into one version is twenty entries somebody has to reconstruct in an afternoon, and the ones that get dropped are the ones that were hard to describe.

## Examples

Good, in the pull request that makes the change:

```markdown
## 0.4.2 - 2026-09-19

### Fixed

Removing a worktree no longer deletes ignored files. It used to remove
them at exit 0 and without a word, so a `.env` beside the checkout was
gone with it.
```

Bad, the same change described by somebody reading it back later:

```markdown
### Fixed

Fixed worktree handling.
```

Bad, in that there is nothing to read at all:

```
Compare: v0.4.1...v0.4.2
```

## Notes

The entry lands in the section naming the version that change claims, which is a version that moved, because a change a reader can observe moves one. So the check is the same either way: a project that changed carries a section for the version it now declares.

A project that keeps no changelog owes no entry, and a repository declares which projects keep one.

A change that observes nothing writes nothing here, which is the same test the [`release-note` block](note-or-none.md) applies. The block is what one change declares about itself; the changelog is where the project's changes accumulate.

The shape of a section, its heading and its ordering are in [FORMAT.md](../FORMAT.md). What a good entry says is in the [guide](../README.md#guide).
