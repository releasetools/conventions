---
name: tag-version-to-release
status: draft
checked_by: []
superseded_by: null
---

# tag-version-to-release

A release starts when a maintainer pushes its version tag, annotated and signed, on the release commit; no workflow
creates or moves a repository's own exact version tags.

## Why

A tag signed by whoever cut the release names that person. GitHub verifies it against a key on their account,
`git verify-tag` checks it offline, and a ruleset that requires signatures on `v*` refuses anything else. A workflow
cannot make that tag. `GITHUB_TOKEN` and App tokens create tags through the API as lightweight refs with no signature,
and a key held in CI signs as whoever registered it, so the signature no longer says who released.

A workflow that creates its own tag also needs a second way to start and a second set of checks. It takes the version
and the commit as inputs, refuses a branch that moved after the merge and a manifest that disagrees, and runs inside
itself whatever a tag push would have started, because a tag created with `GITHUB_TOKEN` starts no workflow. A pushed
tag carries the version and the commit in one name, and the workflow reads both from the ref it started on.

## Examples

Good, the release tool tags the verified release commit and pushes it:

```sh
git tag -s v1.2.3 -m "Release v1.2.3" a14226b
git push origin v1.2.3
```

and the publish workflow starts on that push:

```yaml
on:
  push:
    tags: ['v[0-9]+.[0-9]+.[0-9]+']
```

Bad, a workflow that makes the tag it publishes:

```yaml
on:
  workflow_dispatch:
    inputs:
      version:
        required: true
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - env:
          VERSION: ${{ inputs.version }}
        run: gh api "repos/$GITHUB_REPOSITORY/git/refs" -f ref="refs/tags/v$VERSION" -f sha="$GITHUB_SHA"
```

## Notes

A GitHub Action whose `action.yml` runs a bundled `dist/` commits that bundle on the release branch. The release commit
is then the commit consumers run, so its tag works as a `uses:` ref and as a pinned SHA. A CI job that rebuilds the
bundle and fails on any difference keeps it current.

The release tool pushes the tag only after `checks` passes on the release commit, as
[FORMAT.md](../FORMAT.md#configuration) requires, so a failing build shows up before the version exists. A failure
inside publication itself spends the version, and [`immutable-tag`](immutable-tag.md) says what follows.

A workflow that mirrors a release into another repository, such as dotsecenv publishing `plugin/` to `dotsecenv/plugin`,
tags the mirror with the version it read from the pushed tag. That tag belongs to the mirror, not to the repository that
released.

This convention covers exact version tags. A floating major such as `v1` moves on every release, as
[FORMAT.md](../FORMAT.md#versions-and-tags) describes.

The other way a release starts is `release.trigger: dispatch` in [FORMAT.md](../FORMAT.md#configuration), where the
publish workflow creates the tag on a built commit. releasetools/actions and releasetools/mutex publish that way,
because the `dist/` their `action.yml` runs is built at release time rather than committed.
