---
name: breaking-says-how
status: draft
checked_by: []
superseded_by: null
---

# breaking-says-how

A breaking change says what to do instead, in a `BREAKING CHANGE:` footer, and that sentence is what the release notes lead with.

## Why

A major version says something broke. It does not say what, and it does not say what the person reading it should now type. That reader is mid-upgrade, their build has just failed, and the information they need was in somebody's head six weeks ago.

Keep a Changelog has no slot for this. Its six types say what kind of change happened, and none of them carries the migration. So the slot has to come from somewhere, and Conventional Commits already has one: the `BREAKING CHANGE:` footer, whose value is a description of the break.

Making it the required half of `!` is what turns "breaking" from a label into a document. It is also the only part of a breaking change a tool can check: whether the footer is there, and whether it says anything.

## Examples

Good:

```
feat(cli)!: git::version_tag prints the tag with its v

BREAKING CHANGE: git::version_tag now prints v1.2.3 where it printed
1.2.3, and git::latest_version prints 1.2.3 where it printed v1.2.3.
Callers stripping a leading v from version_tag can drop the strip;
callers adding one to latest_version now need it.
```

Bad — the break is announced and the reader is left to work it out:

```
feat(cli)!: rename version helpers

BREAKING CHANGE: the version helpers changed.
```

Bad — marked breaking with no footer at all. Nothing tells the reader what moved, and the release notes have a major version with nothing under it.

## Notes

The footer belongs to the change, not to the release. A release that gathers three breaking changes leads with three of these, in the order the changes landed.

`remove` is always breaking and so always carries a footer, naming what replaces the thing that is gone, or saying plainly that nothing does.

Where a break needs more than a paragraph, the footer says what to do and the release note carries the table. The footer is the sentence somebody reads in a terminal; the note is the page they read afterwards.

How a tool checks that the footer is present, and how the release notes render it, are in [FORMAT.md](../FORMAT.md).
