---
name: agent-index
status: draft
checked_by: []
superseded_by: null
---

# agent-index

A repository describes itself to agents in the two files they look for, `context7.json` and `llms.txt`.

## Why

An agent that finds neither describes the project from whatever it happens to read: a README written for somebody who
already knows what the project is, a directory listing, a test. These two files are where a project says what it is,
what its commands do, and when to reach for one over another, in the shape the tools that index it expect.

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

Good, an `llms.txt` written to [the specification](https://llmstxt.org): a title, a summary, and the links an agent
should read first.

Bad, neither file, and a README that assumes its reader already knows what the project is for.
