---
name: note-or-none
status: draft
checked_by: []
superseded_by: null
---

# note-or-none

Every change declares a release note, or explicitly declares that it has none.

## Why

Release notes written at release time are written from memory, often by someone who did not make the change. Requiring
each change to declare its own note moves the writing to the person who knows what changed, at the moment they know it.

Requiring an explicit "none" is what makes the rule checkable: a missing declaration is then always a mistake, never a
judgement call about whether the change was user-facing.

## Examples

Good — a user-facing change:

```release-note
Fixed a crash when the config file is empty.
```

Good — an internal change:

```release-note
NONE
```

Bad — nothing declared. A tool cannot tell whether the author decided the change was internal or forgot.

## Notes

What counts as a change (pull request, merge request, commit) and where the declaration lives are defined in
[FORMAT.md](../FORMAT.md). This convention only says that the declaration is present.
