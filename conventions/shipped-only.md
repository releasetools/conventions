---
name: shipped-only
status: draft
checked_by: []
superseded_by: null
---

# shipped-only

A change that fixes something no released version carried takes a type that observes nothing.

## Why

A bug introduced and fixed between two tags never reached anybody. Typed `fix`, it increments the patch and writes an
entry under `### Fixed`, so the release announces a problem no user could have hit and charges a version number for it.

The reader pays for that twice. Every line that cannot change an upgrade decision makes the lines that can harder to
find, and a version that moved for nothing teaches people that the number means nothing.

The test is mechanical. The baseline is the newest tag reachable from the commit, which is what "Judging a version"
already defines. If the code being fixed arrived after that tag, the bug never shipped.

## Examples

Good, a regression in an unreleased feature, caught before the tag:

```
chore: stop the new batch parser panicking on an empty body
```

Good, the same bug after 2.3.0 shipped it:

```
fix: stop the batch parser panicking on an empty body
```

Bad, an unreleased regression typed as a fix. The release notes carry "Fixed a panic on an empty body" for a panic that
only ever existed on the main branch.

## Notes

The `NONE` follows rather than needing saying: a type that observes nothing declares `NONE` in the block under
[FORMAT.md](../FORMAT.md), and [`note-or-none`](note-or-none.md) requires the declaration to be there.

This says nothing about which type to use. `chore` and `refactor` both observe nothing, and the choice between them is
the ordinary one.

A fix to a released pre-release is not covered here. Somebody was running `2.4.0-rc.1`, so the bug shipped and the fix
is a `fix`.
