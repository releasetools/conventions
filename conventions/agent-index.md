---
name: agent-index
status: draft
checked_by: []
superseded_by: null
---

# agent-index

A repository describes itself to agents in `context7.json`, and a project that publishes a site serves `llms.txt` from
it.

## Why

An agent that finds nothing describes the project from whatever it happens to read: a README written for somebody who
already knows what the project is, a directory listing, a test. `context7.json` is where a repository says what it is,
what its commands do, and what an agent should repeat, in the shape the tool that indexes it expects.

`llms.txt` answers a different problem. A site buries its content in navigation, scripts and markup, and one markdown
file at its root saves an agent from extracting it. A repository of markdown buries nothing, so a repository with no
site owes no `llms.txt`: it would be a second index of files the README already lists, kept in step by hand.

## Examples

Good, a `context7.json` at the root. Context7 reads it the way a crawler reads `robots.txt`, its fields are in the
[library owners guide](https://context7.com/docs/library-owners), and
[adding a library](https://context7.com/docs/adding-libraries) is how a repository gets indexed:

```json
{
  "$schema": "https://context7.com/schema/context7.json",
  "projectTitle": "multirepo",
  "description": "Manage multiple git repositories from one extended VSCode .code-workspace file.",
  "rules": [
    "To see which repositories are held and whether the holder is still alive, run `multirepo lock`. It reports; it takes nothing."
  ]
}
```

Good, for a project that publishes a site, an `llms.txt` at that site's root written to
[the specification](https://llmstxt.org): a title, a summary, and the links an agent should read first.

Bad, no `context7.json`, and a README that assumes its reader already knows what the project is for.

Bad, an `llms.txt` in a repository with no site, listing the files the README lists.

## Notes

Committing `context7.json` steers an index rather than joining one. A public repository is indexed whether the file is
there or not, and what it controls is where the crawler looks and what an agent repeats. Joining is a form, which
[adding a library](https://context7.com/docs/adding-libraries) describes.

`.claude/settings.json` is a file an agent reads too. What goes in it is [`declared-plugins`](declared-plugins.md)
rather than this.
