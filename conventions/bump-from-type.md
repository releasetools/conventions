---
name: bump-from-type
status: active
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
whatever sounds like a smaller claim than the author wants to make.

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
| `remove`                                                    | gone. Always breaking                               | minor   | Removed    |
| `security`                                                  | a vulnerability is closed                           | patch   | Security   |
| `refactor`, `test`, `docs`, `build`, `ci`, `chore`, `style` | nothing a user can observe                          | none    | none       |

Any type marked breaking, by a `!` after the type or a `BREAKING CHANGE:` footer, increments the minor whatever the
table says. It still owes a reader what to do instead, which is [`breaking-says-how`](breaking-says-how.md): what
changes here is the number, not the obligation.

The version being released increments by the largest of the changes in the range: one `feat` among forty `fix`es is a
minor, and so is one breaking change among anything. Nothing in the range increments the major.

## The major is asked for

Nothing derives the major. A tool computes the minor or the patch from the types in the range and stops there, and a
release that increments the major does it because a person said to, asked in as many words and answering in as many
words.

That is the one place where "how big is this" is the right question, and the only person who can answer it is whoever
knows what the release is for. A rename, a protocol nobody's old client speaks, a support line ending: none of those
follow from a commit subject, and a rule that inferred them would be inferring what it cannot see.

So the arithmetic is the same either side of `1.0.0`, and `0.y.z` is not a special case. A `feat` and a breaking change
both move the minor, everything else moves the patch, and the major moves when somebody says so.

What that costs is real. Above `1.0.0`, `^1.2.0` in somebody's manifest resolves across a break, which is not what
Semantic Versioning promises a caret means. It is paid on purpose: the alternative is a major that moves on the
arithmetic of a commit subject and says less every time it does.

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

Good — a breaking change releases a minor, whatever the leading digit is:

```
feat(cli)!: git::version_tag prints the tag with its v
```

`0.2.0` → `0.3.0`, and `1.2.0` → `1.3.0`

Good — a major, because somebody was asked and answered:

```
The CLI is renamed and the old name is gone. Release this as 2.0.0?
```

`1.7.3` → `2.0.0`

## Notes

A release containing only types that observe nothing still happens, and still gets a version and an entry. "Neither
action changed" is a true thing to publish, and is better than a release nobody can account for. It increments the
patch.

Which types exist and what a tool does with an unknown one is in [FORMAT.md](../FORMAT.md). What a breaking change owes
its reader beyond the version is in [breaking-says-how](breaking-says-how.md).
