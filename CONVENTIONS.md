# Conventions

One line per convention. Each name links to its full entry.

| Name | Convention | Status |
|---|---|---|
| [`note-or-none`](conventions/note-or-none.md) | Every change declares a release note, or explicitly declares that it has none. | draft |
| [`typed-change`](conventions/typed-change.md) | Every change declares what kind of change it is, in its subject line, using Conventional Commits. | draft |
| [`semver-versions`](conventions/semver-versions.md) | Every released version is a semantic version, and the version a release declares is the version its tag names. | draft |
| [`bump-from-type`](conventions/bump-from-type.md) | The part of the version that increments follows from the types of the changes being released. | draft |
| [`breaking-says-how`](conventions/breaking-says-how.md) | A breaking change says what to do instead, in a `BREAKING CHANGE:` footer, and the release notes lead with it. | draft |

Statuses: `draft` (proposed, not yet enforced by any tool), `active`, `deprecated` (kept for existing adopters; the entry names its successor).
