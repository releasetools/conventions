---
name: docs-with-change
status: draft
checked_by: []
superseded_by: null
---

# docs-with-change

Every change a reader can observe updates the documentation of the behaviour it touches, in the change that makes it.

## Why

A page describing behaviour a tool no longer has is worse than no page. The reader follows it, the tool disagrees with
them, and what they learn is that this project's documentation cannot be trusted. That verdict is cheap to earn and
expensive to reverse, and it carries to every page they have not read yet.

Left for afterwards, the update does not happen. Whoever knew what moved has gone on to the next thing, and the surface
that is now wrong is rarely the one they would think to open: a command table three files away, a guide somebody else
wrote, a snippet in a quickstart. Landing it in the same change is what puts it in front of a reviewer, who is the only
other person reading the diff while the reasoning is still available.

## Examples

Good, one pull request:

```text
src/commands/lock.rs   the command
README.md              the command table a new reader scans
docs/tutorial.md       the task where somebody would reach for it
```

Bad, the same change with "docs to follow" in its description, or an issue filed to write them later:

```text
src/commands/lock.rs   the command
```

## Notes

Which surfaces exist is the repository's answer rather than this convention's. A repository names them where its
contributors already look, and a change updates the ones describing what it did.

Documentation in another repository is outside this. A change cannot be atomic across two of them, so a website or a
handbook that lives elsewhere is its own change, and what carries it there is the release rather than the pull request.

The changelog is not documentation of behaviour. It is the record of what moved, and
[`changelog-per-change`](changelog-per-change.md) is the convention asking for it. Having the files agents read at all
is [`agent-index`](agent-index.md); this is what keeps them current.

Nothing checks this. "The diff touched a documentation file" is blunt enough to be ignored within a week, and the exact
question is narrower: every command a tool answers to appears in the surfaces the repository declares. That one is
checkable against the tool's own help output.
