---
name: semver-versions
status: active
checked_by:
  - https://github.com/releasetools/actions/tree/main/versions-guard
superseded_by: null
---

# semver-versions

Every released version is a [semantic version](https://semver.org/spec/v2.0.0.html), and the version a release declares
is the version its tag names.

## Why

A version is a promise about compatibility, and the only reason it can be read by a resolver, a range, a lockfile or a
person in a hurry is that everybody agreed what the parts mean. A version that is not semantic is a serial number, and a
range over serial numbers is a guess.

The second half matters as much as the first. A manifest saying `0.4.1` under a tag saying `v0.4.2` means one of them is
lying to somebody, and which one depends on where the reader looked. Every tool that reads a version reads exactly one
of those places.

## Examples

Good:

```
0.4.2          a release
1.0.0-rc.1     a pre-release of 1.0.0, which sorts before it
1.0.0+build.5  build metadata, which sorts nowhere and is ignored
```

Good — the manifest, the tag and the changelog heading agree:

```
package.json   "version": "0.4.2"
tag            v0.4.2
CHANGELOG.md   ## 0.4.2 - 2026-09-19
```

Bad:

```
2026.09.19     a date
v0.4           two parts
0.4.2-SNAPSHOT a moving target wearing a version's clothes
```

## Notes

A tag carries the `v`; a version does not. `v0.4.2` is what `git tag` holds, `0.4.2` is what a manifest, a chart and a
package index hold. Tools accept either where a human types one, and print the one their output is for.

A pre-release sorts before the release it names, which is what `1.0.0-rc.1 < 1.0.0` means and why an `rc` cannot be
published as the thing it is a candidate for. Build metadata sorts nowhere: two versions differing only after a `+` are
the same version.

Where projects version independently, each carries its own and the tag names both the project and the version. The shape
of that tag is in [FORMAT.md](../FORMAT.md).

`versions-guard` checks the first half. It refuses a manifest whose version it cannot parse, and refuses two manifests
of one project that declare different versions. The second half, that the tag names what the release declares, is
checked by nothing: the action reads a tag only to find the baseline it compares against.
