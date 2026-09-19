# Format

This is the machine-readable part of the conventions: what tools in releasetools have to agree on exactly. It is the only file in this repo written in normative language. The key words MUST, MUST NOT, SHOULD, SHOULD NOT and MAY are to be interpreted as described in RFC 2119.

**Status: proposal.** Nothing here is settled until a tool implements it.

## Terms

- **change** — the unit that carries a release note: a pull request or merge request, or a commit where those do not exist.
- **release note** — a short statement, written for the software's users, of one thing the change did.
- **declaration** — the block in a change's description that carries its release notes, or the word `NONE`.
- **project** — a directory with its own version. A repository is one project unless it declares several.

## The subject

A change's subject line follows [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/):

```
<type>[(<scope>)][!]: <description>
```

1. A change MUST carry a type from the table below.
2. A change MAY carry a scope. In a repository declaring more than one project, the scope MUST be a project's name, and is what routes the change's release note to that project.
3. A `!` before the `:` marks the change breaking.
4. A tool MUST treat a type it does not recognise as observing nothing, and SHOULD say which type it did not recognise.

Under a squash merge the pull request title becomes the subject, so the subject is declared once.

## Types

| type | version | changelog section |
| --- | --- | --- |
| `feat` | minor | Added |
| `fix` | patch | Fixed |
| `perf` | patch | Changed |
| `deprecate` | minor | Deprecated |
| `remove` | major | Removed |
| `security` | patch | Security |
| `refactor`, `test`, `docs`, `build`, `ci`, `chore`, `style` | none | none |

1. A change of type `remove` MUST be marked breaking.
2. A change marked breaking MUST increment the major, whatever its type.
3. Under `0.y.z`, a change that would increment the major MUST increment the minor instead, and every other change MUST increment the patch.
4. A release MUST increment by the largest increment among the changes in its range.
5. A release whose range contains no change that observes anything MUST still increment the patch.

## Breaking changes

1. A change marked breaking MUST carry a `BREAKING CHANGE:` footer.
2. The footer's value MUST say what to do instead.
3. A tool MUST fail a breaking change with no footer, or with an empty one.
4. Generated release notes MUST place breaking changes first, and MUST render each footer with its note.

## The block

A release note is declared in a fenced code block tagged `release-note` in the change's description:

````
```release-note
Batch mode processes up to 10,000 records per request. Enable it with the
batch=true query parameter.
```
````

1. A change MUST contain at most one `release-note` block.
2. The block MUST contain either one release note, as Markdown, or the single word `NONE`.
3. The block carries prose only. The type, the scope and the breaking marker are read from the subject, so nothing is declared in two places.
4. Text outside the block MUST NOT be treated as a release note.
5. Leading and trailing whitespace, and leading and trailing empty lines, SHOULD be ignored.
6. A change needing notes under two different sections is two changes.

A change whose type observes nothing SHOULD declare `NONE` rather than omit the block, so that a missing block is always a mistake and never a judgement.

## Versions and tags

1. A version MUST be a [semantic version](https://semver.org/spec/v2.0.0.html), and MUST be compared by that specification's rules, so a pre-release precedes the release it names and build metadata is ignored.
2. A version MUST NOT carry a leading `v`. A tag MUST carry one.
3. The version a project's manifest declares, the version its changelog's newest section names, and the version its tag names MUST be the same.
4. A repository releasing as one thing tags `v<version>`.
5. A repository whose projects version independently tags `<project>/v<version>`.
6. An exact version tag MUST NOT be moved once published.
7. A floating major tag, `v<major>` or `<project>/v<major>`, MAY be moved, and MUST point at the newest release on that major line. A backport MUST NOT move it backwards.
8. A published release is not withdrawn. A release found to be wrong is superseded by another, and the superseding version's section says so.

## Distribution tags

A registry's mutable tags, such as npm's dist-tags, point at immutable versions.

1. The tag meaning newest, `latest` on npm, MUST point at the highest version published, compared by semantic version rules.
2. A release lower than what that tag names MUST NOT be published to it. It MUST be published to `backport-<major>`.
3. A line tag MUST only move forwards within its line. A release lower than what its own line tag names is published under no mutable tag.
4. A pre-release MUST NOT be published to the tag meaning newest.

## Judging a version

A tool deciding whether a version was incremented enough:

1. The **baseline** is the newest tag matching the project's tag shape that is reachable from the commit being judged, which is what `git describe` answers. A tag on a branch this commit does not descend from is another line's release and MUST NOT be the baseline.
2. The **required increment** is the largest that the types in the range imply, by the table above.
3. The version being judged MUST be greater than or equal to the baseline incremented by the required increment, compared by semantic version rules.
4. Greater than is not a failure. A minor already claimed by an earlier unreleased change absorbs every patch that follows it.
5. With no baseline, any version is a first release and MUST pass.

## The changelog

A project's changelog follows [Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/).

1. A change a reader can observe MUST write its entry in the changelog, in the section naming the version that change claims, rather than leave it to be reconstructed at release time.
2. Every released version MUST have a section.
3. A version's section MUST open with `## <version> - <date>`, the date in ISO 8601.
4. Sections MUST be ordered newest first.
5. Notes MUST be grouped under the section names in the types table, as `###` headings, and only those with something under them.
6. A section MUST NOT carry pull request numbers, issue numbers or author handles. The release page carries those.
7. A section MAY close with `### Choices`, recording what was chosen and what the alternative failed to do.

## Release notes

1. Generated release notes MUST begin with the changelog section for the version being released.
2. They MAY be followed by generated material: contributors, merged changes, a comparison link.
3. A release whose section is empty MUST publish a configured default rather than nothing.
4. A release whose section is missing MUST fail rather than publish empty notes.

## Configuration

Adopters declare exceptions in `.releasetools.yaml` at the repo root. The file SHOULD open with a comment naming these conventions, so a reader who has not seen one before can find out what reads it:

```yaml
# How this repository releases, read by every releasetools tool.
#
# Conventions: https://github.com/releasetools/conventions
# Tools:       https://github.com/releasetools
conventions:
  except:
    - <name>
```

1. The file is YAML, in the subset of it that mappings, lists, scalars and flow lists of scalars make up. A tool MAY refuse an anchor, a tag, a block scalar or anything else outside that subset, and MUST say which line it refused.
2. `conventions.except` is a list of convention names. Each MUST match the `name` of a file in `conventions/`.
3. A tool MUST NOT check a convention listed in `except`.
4. A missing file is equivalent to an empty `except` list.
5. Tools MAY ignore keys they do not recognise.

The same file declares what the repository holds:

```yaml
projects:
  - path: packages/*
    manifest: package.json
    changelog: CHANGELOG.md
ignore-files:
  - CHANGELOG.md
  - README.md
  - LICENSE
case-sensitive: false
```

6. `projects` is a list of groups. `path` is one directory or a list of them, as paths or globs; `manifest` is one file or a list, every one of which a project holds MUST declare the same version; `changelog` names one file, and a group without it owes no section.
7. A directory two groups both match belongs to the first.
8. A file's edits do not count as its project changing when it is that project's manifest, its changelog, or matched by `ignore-files`, which defaults to `CHANGELOG.md`, `README.md` and `LICENSE` and is replaced rather than extended by what an adopter writes.
9. An `ignore-files` pattern matches the end of a path on segment boundaries, and matches without regard to case unless `case-sensitive` is true.
10. A `path`, a `manifest` or a `changelog` that is absolute, or that leaves the repository, MUST fail the run rather than be resolved.
11. A repository with no `projects` is one project at its root.

## Open questions

- Where a project declares its version when its ecosystem has no manifest that carries one.
- Whether a scope naming one project and a diff touching another is an error, and which of the two decides where the note lands.
