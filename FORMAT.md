# Format

This is the machine-readable part of the conventions: what tools in releasetools have to agree on exactly. It is the
only file in this repo written in normative language. The key words MUST, MUST NOT, SHOULD, SHOULD NOT and MAY are to be
interpreted as described in RFC 2119.

**Status: proposal.** Nothing here is settled until a tool implements it.

## Terms

- **change** — the unit that carries a release note: a pull request or merge request, or a commit where those do not
  exist.
- **release note** — a short statement, written for the software's users, of one thing the change did.
- **declaration** — the block in a change's description that carries its release notes, or the word `NONE`.
- **project** — a directory with its own version. A repository is one project unless it declares several.

## The subject

A change's subject line follows [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/):

```
<type>[(<scope>)][!]: <description>
```

1. A change MUST carry a type from the table below.
2. A change MAY carry a scope. In a repository declaring more than one project, the scope MUST be a project's name, and
   is what routes the change's release note to that project.
3. A `!` before the `:` marks the change breaking.
4. A tool MUST treat a type it does not recognise as observing nothing, and SHOULD say which type it did not recognise.
5. A scope naming one project while the diff touches another is not an error. The scope decides where the note lands,
   since it is what the author declared, and a tool SHOULD report the difference rather than fail the run. A change that
   owes a note to two projects is two changes.

Under a squash merge the pull request title becomes the subject, so the subject is declared once.

## Types

| type                                                        | version | changelog section |
| ----------------------------------------------------------- | ------- | ----------------- |
| `feat`                                                      | minor   | Added             |
| `fix`                                                       | patch   | Fixed             |
| `perf`                                                      | patch   | Changed           |
| `deprecate`                                                 | minor   | Deprecated        |
| `remove`                                                    | major   | Removed           |
| `security`                                                  | patch   | Security          |
| `refactor`, `test`, `docs`, `build`, `ci`, `chore`, `style` | none    | none              |

1. A change of type `remove` MUST be marked breaking.
2. A change marked breaking MUST increment the major, whatever its type.
3. Under `0.y.z`, a change that would increment the major MUST increment the minor instead, and every other change MUST
   increment the patch.
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
3. The block carries prose only. The type, the scope and the breaking marker are read from the subject, so nothing is
   declared in two places.
4. Text outside the block MUST NOT be treated as a release note.
5. Leading and trailing whitespace, and leading and trailing empty lines, SHOULD be ignored.
6. A change needing notes under two different sections is two changes.
7. The block and the change's changelog entry are separate declarations and MAY differ. The block is what one change
   claims about itself, and a guard reads it there. What a release publishes comes from the changelog, where an entry
   can be rewritten as the version takes shape without reopening a merged change.

A change whose type observes nothing SHOULD declare `NONE` rather than omit the block, so that a missing block is always
a mistake and never a judgement.

## Versions and tags

1. A version MUST be a [semantic version](https://semver.org/spec/v2.0.0.html), and MUST be compared by that
   specification's rules, so a pre-release precedes the release it names and build metadata is ignored.
2. A version MUST NOT carry a leading `v`. A tag MUST carry one.
3. The version a project's manifest declares, the version its changelog's newest section names, and the version its tag
   names MUST be the same.
4. A repository releasing as one thing tags `v<version>`.
5. A repository whose projects version independently tags `<project>/v<version>`.
6. An exact version tag MUST NOT be moved once published.
7. A floating major tag, `v<major>` or `<project>/v<major>`, MAY be moved, and MUST point at the newest release on that
   major line. A backport MUST NOT move it backwards.
8. A published release is not withdrawn. A release found to be wrong is superseded by another, and the superseding
   version's section says so.

## Distribution tags

A registry's mutable tags, such as npm's dist-tags, point at immutable versions.

1. The tag meaning newest, `latest` on npm, MUST point at the highest version published, compared by semantic version
   rules.
2. A release lower than what that tag names MUST NOT be published to it. It MUST be published to `backport-<major>`.
3. A line tag MUST only move forwards within its line. A release lower than what its own line tag names is published
   under no mutable tag.
4. A pre-release MUST NOT be published to the tag meaning newest.

## Judging a version

A tool deciding whether a version was incremented enough:

1. The **baseline** is the newest tag matching the project's tag shape that is reachable from the commit being judged,
   which is what `git describe` answers. A tag on a branch this commit does not descend from is another line's release
   and MUST NOT be the baseline.
2. The **required increment** is the largest that the types in the range imply, by the table above.
3. The version being judged MUST be greater than or equal to the baseline incremented by the required increment,
   compared by semantic version rules.
4. Greater than is not a failure. A minor already claimed by an earlier unreleased change absorbs every patch that
   follows it.
5. With no baseline, any version is a first release and MUST pass.

## The changelog

A project's changelog follows [Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/).

1. A change a reader can observe MUST write its entry in the changelog, in the section naming the version that change
   claims, rather than leave it to be reconstructed at release time.
2. Every released version MUST have a section.
3. A version's section MUST open with `## <version> - <date>`, the date in ISO 8601.
4. Sections MUST be ordered newest first.
5. Notes MUST be grouped under the section names in the types table, as `###` headings, and only those with something
   under them.
6. A section MUST NOT carry pull request numbers, issue numbers or author handles. The release page carries those.
7. A section MAY close with `### Choices`, recording what was chosen and what the alternative failed to do.

## Release notes

1. Generated release notes MUST begin with the changelog section for the version being released.
2. They MUST render that section's entries as a flat list, dropping the `###` headings the changelog groups them under.
   The changelog groups because it holds every version; a release note holds one.
3. They MAY be followed by generated material: contributors, merged changes, a comparison link.
4. A release whose section is empty MUST publish a configured default rather than nothing.
5. A release whose section is missing MUST fail rather than publish empty notes.

## Configuration

Adopters declare exceptions in `.releasetools.yaml` at the repo root. The file SHOULD open with a comment naming these
conventions, so a reader who has not seen one before can find out what reads it:

```yaml
# How this repository releases, read by every releasetools tool.
#
# Conventions: https://github.com/releasetools/conventions
# Tools:       https://github.com/releasetools
conventions:
  except:
    - <name>
```

1. The file is YAML, in the subset of it that mappings, lists, scalars and flow lists of scalars make up. A tool MAY
   refuse an anchor, a tag, a block scalar or anything else outside that subset, and MUST say which line it refused.
2. `conventions.except` is a list of convention names. Each MUST match the `name` of a file in `conventions/`.
3. A tool MUST NOT check a convention listed in `except`.
4. A missing file is equivalent to an empty `except` list.
5. Tools MAY ignore keys they do not recognise.

The same file declares what the repository holds:

```yaml
projects:
  - path:
      - packages/api
      - packages/web
    manifest: package.json
    changelog: CHANGELOG.md
    bump: npm version {version} --no-git-tag-version
ignore-files:
  - CHANGELOG.md
  - README.md
  - LICENSE
case-sensitive: false
```

6. `projects` is a list of groups. `path` is one directory or a list of them, each named: a project is opted in and
   never found, so a path MUST NOT be a pattern and a tool MUST refuse one. What a run checks is what this file says,
   rather than what the tree happens to hold when the run starts.
7. `manifest` is one file or a list. A project that carries a version MUST name the file it lives in rather than leave
   it to be inferred from what a directory holds, and every file named MUST declare the same version, since whichever
   one a client reads is the one that decides whether it updates. A project that carries no version omits the key and is
   not released: nothing bumps it, no tag names it, and a tool asked to release it MUST say so and stop. `changelog`
   names one file, and a group without it owes no section. Both are names inside the project's own directory, so
   `manifest: package.json` under `packages/api` is `packages/api/package.json`, and `.claude-plugin/plugin.json` is one
   a directory below that.
8. A `path` that is not a directory MUST fail the run. A project that was declared and is not there is a mistake, not
   nothing to check.
9. `bump` is the command that sets a project's version, with `{version}` where the version goes. Every ecosystem ships
   one, so no tool writes a manifest it was not told how to write. A project without it is set by hand, or by whatever
   knows that manifest's shape.
10. A directory two groups both name belongs to the first.
11. A file's edits do not count as its project changing when it is that project's manifest, its changelog, or matched by
    `ignore-files`, which defaults to `CHANGELOG.md`, `README.md` and `LICENSE` and is replaced rather than extended by
    what an adopter writes.
12. An `ignore-files` pattern matches the end of a path on segment boundaries, and matches without regard to case unless
    `case-sensitive` is true.
13. A `path`, a `manifest` or a `changelog` that is absolute, or that leaves the repository, MUST fail the run rather
    than be resolved.
14. A version is read from a `.json` file's top-level `version`, a `.toml` file's `package`, `project`, `tool.poetry` or
    `workspace.package` table, a `.yaml` or `.yml` file's top-level `version:`, a `.properties` file's `version=` line,
    or from a file of any other name holding the version and nothing else.
15. A file keeping its version in XML or in code is none of those kinds. `pom.xml`, a `.csproj` and a `.gemspec` MUST
    NOT be read, since reading them means an XML parser or an interpreter in every tool. A project of that shape
    declares a `VERSION` file its build reads, which is a file holding the version and nothing else.
16. A tool that needs this file and does not find one MUST say so and stop, rather than assume a project. A guess is
    reported on as though somebody asked for it.

And how a release is cut:

```yaml
release:
  branch: main
  checks: tests.yml
  publish: publish.yml
  registry: https://registry.example/<name>/{version}
```

17. `branch` is the branch a release is cut from. Absent, it is the repository's default branch.
18. `checks` names the workflow that MUST be green on the commit a tag will name. Absent, nothing is waited for.
19. `publish` names the workflow a tag starts. Absent, pushing the tag is the end of it.
20. `registry` is a URL that MAY be checked before a release, with `{version}` where the version goes. Where it is
    checked it MUST answer 404 for a version nobody has released. Not every registry answers a question like that, and a
    repository whose does not leaves it out.
21. A tool MUST NOT tag a commit whose `checks` workflow has not passed on that commit.
22. The shape of the tag is the one in "Versions and tags", which this section does not redeclare.
