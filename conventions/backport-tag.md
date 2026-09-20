---
name: backport-tag
status: draft
checked_by: []
superseded_by: null
---

# backport-tag

A release older than the newest one is published under a mutable tag naming its line, and never under the one that means
newest.

## Why

A registry's mutable tags are how a client that asked for no version decides what to install.
`npm install @releasetools/mutex` reads `latest`; `npm install @releasetools/mutex@1.4.0` reads nothing mutable at all.
Publishing 1.2.4 as `latest` after 2.0.0 shipped hands the older code to everybody who asked for none of it, and nothing
about the version they receive says they were downgraded.

A backport still has to be installable without naming the exact patch, because the people on that line want its fixes
and not the major after it. That is what a line tag is for: `backport-1` follows the 1.x line the way `latest` follows
the newest, and somebody pinned to the line gets the fix by asking for the line.

## Examples

Good, releasing 2.1.0 when `latest` is 2.0.0:

```
npm publish --tag latest
```

Good, releasing 1.2.4 when `latest` is 2.0.0:

```
npm publish --tag backport-1
```

Bad:

```
npm publish --tag latest      # latest now means 1.2.4, for everybody
npm publish --tag backport    # one pointer for every line, so 1.2.4 after
                              # a 3.x backport moves it backwards again
```

## Notes

A line tag moves forwards within its line and nowhere else. A release lower than what its own line tag already names
goes out under no mutable tag; the exact version is still installable, which is all a release that supersedes nothing
needs.

npm refuses a dist-tag that reads as a version range, so `v1` and `1.x` cannot be used and `backport-1` is the shape
this convention names. The git tag for the same release is `v1.2.4`, unchanged: git tags name releases, registry tags
point at them.

A tool reading the registry decides the tag by comparing the version being published against what `latest` names, so the
decision needs no input and no memory of which branch the release came from.
