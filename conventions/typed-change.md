---
name: typed-change
status: draft
checked_by: []
superseded_by: null
---

# typed-change

Every change declares what kind of change it is, in its subject line, using
[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

## Why

A release note says what changed. The type says what kind of change it was, and that is a different question with two
answers that nothing else supplies: which part of the version increments, and which section of the changelog the note
belongs under.

Reading the kind back out of a diff is guesswork. A rename is a fix or a break depending on whether anybody called the
old name, and the diff does not say. The author knows, in one word, at the moment they write the subject.

Conventional Commits is a specification somebody else already maintains, with tooling that already exists. Adopting it
means the repository gains that without inventing a dialect.

## Examples

Good:

```
feat(release-guard): read a version out of Cargo.toml
fix: refuse a base ref git cannot reach
security: stop following a symlink out of the repository
```

Good — a scope names which project in a repository that holds several:

```
feat(mutex): take a lock for a whole workflow run
```

Bad — the kind is in the body, or nowhere:

```
Update release-guard
Various fixes
```

## Notes

The type set this adds to Conventional Commits' `feat` and `fix`, and what each means for the version and the changelog,
is in [bump-from-type](bump-from-type.md). The exact grammar, including the scope and the `!` marker, is in
[FORMAT.md](../FORMAT.md).

The scope is optional in a repository that releases as one thing, and names the project in a repository where projects
version independently. Where it does, it is what routes a release note to the right changelog.

A squash merge makes the pull request title the commit subject, so the type is declared once, in the place a reviewer
already reads.
