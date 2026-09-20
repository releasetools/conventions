---
name: bump-from-type
status: draft
checked_by:
  - https://github.com/releasetools/actions/tree/main/versions-guard
superseded_by: null
---

# bump-from-type

The part of the version that increments follows from the types of the changes being released, not from anybody's
judgement at release time.

## Why

"Is this a minor or a patch" asked at release time is asked about a range of changes nobody remembers individually, by
somebody comparing the size of the diff to the size of the number. The answer drifts, and it drifts in one direction:
releases that should have been major go out as minor, because a major sounds like a bigger claim than the author wants
to make.

Asked per change, at the moment it is written, it is not a judgement about size at all. It is one question with one
answer: can somebody's working setup stop working. That question has already been answered by the time the type is
chosen, so the release arithmetic is arithmetic.

## The mapping

| type                                                        | what it means                                       | version | changelog  |
| ----------------------------------------------------------- | --------------------------------------------------- | ------- | ---------- |
| `feat`                                                      | something a user can now do                         | minor   | Added      |
| `fix`                                                       | something that was wrong for a user is not any more | patch   | Fixed      |
| `perf`                                                      | same result, materially faster or smaller           | patch   | Changed    |
| `deprecate`                                                 | still works, and is announced for removal           | minor   | Deprecated |
| `remove`                                                    | gone. Always breaking                               | major   | Removed    |
| `security`                                                  | a vulnerability is closed                           | patch   | Security   |
| `refactor`, `test`, `docs`, `build`, `ci`, `chore`, `style` | nothing a user can observe                          | none    | none       |

Any type marked breaking, by a `!` after the type or a `BREAKING CHANGE:` footer, increments the major whatever the
table says.

The version being released increments by the largest of the changes in the range: one `feat` among forty `fix`es is a
minor, one breaking change among anything is a major.

## Before 1.0.0

Semantic Versioning says that under `0.y.z` anything may change at any time, which is a rule for people publishing and
no help to people depending. Under `0.y.z`:

- a breaking change increments the minor: `0.4.2` to `0.5.0`
- everything else increments the patch: `0.4.2` to `0.4.3`

That keeps `^0.4.2` and `~0.4.2` meaning what a reader expects while the leading zero lasts, and it makes the move to
`1.0.0` a decision about stability rather than a change in how the numbers behave.

## Examples

Good — a range of `fix` and `docs` releases a patch:

```
fix: refuse a base ref git cannot reach
docs: say which manifest kinds are read
```

`0.2.0` → `0.2.1`

Good — one `feat` in the range releases a minor:

```
fix: refuse a base ref git cannot reach
feat(changelog-section): hand a version's section to the release
```

`0.2.0` → `0.3.0`

Good — a breaking change under `0.y.z` releases a minor, and would release a major after `1.0.0`:

```
feat(cli)!: git::version_tag prints the tag with its v
```

`0.2.0` → `0.3.0`, and `1.2.0` → `2.0.0`

## Notes

A release containing only types that observe nothing still happens, and still gets a version and an entry. "Neither
action changed" is a true thing to publish, and is better than a release nobody can account for. It increments the
patch.

Which types exist and what a tool does with an unknown one is in [FORMAT.md](../FORMAT.md). What a breaking change owes
its reader beyond the version is in [breaking-says-how](breaking-says-how.md).
