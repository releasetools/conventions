---
name: declared-plugins
status: draft
checked_by: []
superseded_by: null
---

# declared-plugins

A repository names the agent plugins its release workflow expects, in the place the agent already reads.

## Why

These conventions describe work somebody has to do: draft the note for a change, carry it through the merge, collate a
release from the notes that arrived. An agent that shows up without the plugin that does one of those steps does it by
hand, differently each time, or skips it and nobody notices until the release is empty.

Declaring them makes the toolchain part of the repository rather than part of whoever happens to be working on it. A
contributor whose client reads the declaration is offered the install; one whose client does not still has a list to
read.

## Examples

Good, `.claude/settings.json` in the repository:

```json
{
  "enabledPlugins": {
    "release-notes@release-tools": true
  },
  "extraKnownMarketplaces": {
    "release-tools": {
      "source": { "source": "github", "repo": "releasetools/agent-plugins" }
    }
  }
}
```

Good, in CONTRIBUTING.md, for a reader whose client is something else:

```markdown
Release notes are drafted with `/release-notes:write`, from the `release-notes` plugin in the `release-tools`
marketplace.
```

Bad:

```markdown
Use the release notes plugin.
```

## Notes

`node bin/adopt.mjs` in this repository writes a starter `.releasetools.yaml` and prints the commands that declare the
plugins:

```shell
claude plugin marketplace add releasetools/agent-plugins --scope project
claude plugin install release-notes@release-tools --scope project
```

`--scope project` is what writes the repository's `.claude/settings.json` rather than the person's own configuration.
The client writes it: a script editing somebody's settings by hand gets the merge wrong on the day it matters.

A plugin that only one person uses does not belong here. What belongs is the one a step of the release depends on, where
doing it by hand gives a different answer.
