---
name: traceable-tag
status: draft
checked_by: []
superseded_by: null
---

# traceable-tag

Every version tag leads back to the commit its release was cut from: it names that commit, or a commit built from it
whose `Source-Commit` trailer names it.

## Why

Tools keep needing the same fact about a tag: where on the release branch its release happened. Release notes count the
changes since then, a version guard judges the next version against it, and a release tool checks that what it published
is the commit it verified. When the tag names a commit on the branch, the branch's own history says.

A repository that publishes a built tree, such as a GitHub Action whose `dist/` is never committed to `main`, tags a
commit on `release/v1` instead, and `main` never contains it. Asked the same question, `git describe` reaches back past
every such release to whatever tag `main` last held, or finds none. Preparing mutex 1.5.1 counted 82 changes from
`v1.1.0` when 12 were new, and releasetools/actions had no tag `main` contained at all.

The workflow that built the tree is the only thing that knows which commit it built from, so it writes that down once,
on the commit it tags.

## Examples

Good, a tag on the release commit:

```
v0.4.5  b2e0f55  chore(release): 0.4.5 (#68)        on main
```

Good, a tag on a built commit:

```
v1.5.1  937b569  release: v1.5.1                    on release/v1

        Source-Commit: <https://github.com/releasetools/mutex/commit/ae79f366154fb069916f67e29502029c749977db>
```

Bad, a built commit that does not say where it came from:

```
v2.0.0  4c1e0aa  release: v2.0.0                    on release/v2
```

## Notes

This holds whatever starts a release. Under `release.trigger: tag` somebody pushes the tag on the release commit, which
satisfies it by construction. Under `dispatch` the publish workflow creates the tag, on the release commit or on a built
one carrying the trailer. [FORMAT.md](../FORMAT.md#configuration) says which, and what each refuses.

A floating major is not a release, so it may sit on a built commit where the exact tags name release commits:
releasetools/cli tags `v0.4.5` on `main` and moves `v0` to the built tree on `release/v0`.

`releasetools/actions/signed-push` writes a `Workflow-Commit` trailer on every commit it makes, naming the commit the
publishing workflow ran on. For a dispatch on the release branch that is the release commit, and tools read it from tags
published before this convention. It is a fact about the run rather than a claim about the release, so a tag published
now carries `Source-Commit`.
