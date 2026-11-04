---
name: immutable-tag
status: draft
checked_by: []
superseded_by: null
---

# immutable-tag

An exact version tag names one commit for good: once `v1.2.3` is published, the next release is `v1.2.4`, never `v1.2.3`
again.

## Why

Whoever pinned `v1.2.3` pinned what it named when they looked. `uses: owner/action@v1.2.3`, a lockfile, a `go.sum`, a
Homebrew checksum and a cached download all keep the old content or its hash, so moving the tag either changes what they
run without a word or breaks the checksum they recorded. Somebody comparing two machines that both say 1.2.3 can no
longer tell from the version that they differ.

A broken release is cheaper to supersede than to replace: 1.2.4 says what 1.2.3 got wrong, and its changelog section
names it.

Some repositories still want the escape hatch, for a release whose publication failed halfway and that nobody could have
installed. Excepting this convention is how a repository says so. The rest of the org can then tell, from
`.releasetools.yaml` alone, which tags it can trust not to move.

## Examples

Good, after a broken `v1.2.3`:

```
v1.2.3  4c1e0aa  release: v1.2.3
v1.2.4  9b7d21f  release: v1.2.4     # supersedes 1.2.3, and its changelog says why
```

Bad:

```
v1.2.3  4c1e0aa  release: v1.2.3
v1.2.3  9b7d21f  release: v1.2.3     # the same name, now on different content
```

A repository that moves tags, declared:

```yaml
conventions:
  except:
    - immutable-tag
```

## Notes

A floating major such as `v1` is not an exact version tag. It moves on every release, as
[FORMAT](../FORMAT.md#versions-and-tags) says, whether or not this convention applies.

Excepting this convention does not make a registry accept the same version twice. npm refuses to publish a version it
already holds, so a repository that moves its tag still publishes the npm package once.

Where the convention applies, a dispatched publish workflow refuses a version whose tag already exists. Where it is
excepted, the workflow may replace the tag, and only when the dispatch asks for it, so a replacement is never an
accident. Either way, a tool moving a tag reports the commit it named before.
