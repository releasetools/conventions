# releasetools conventions

Named, individually adoptable practices for writing release notes. Part of
[releasetools](https://github.com/releasetools).

Each convention is one sentence you can follow on its own, with a stable name you can link to. Tools in releasetools
enforce the conventions they know about.

## Adopting

Add one line to your README or CONTRIBUTING:

> This repo follows the [releasetools conventions](https://github.com/releasetools/conventions).

Adoption is opt-out: that line means all of them. To skip some, name them:

> This repo follows the [releasetools conventions](https://github.com/releasetools/conventions), except `note-or-none`.

Tools read the same declaration from `.releasetools.yaml` at the repository root, where a name under
`conventions.except` turns off that convention's checks. [FORMAT.md](FORMAT.md#configuration) gives the file its shape.

`node bin/adopt.mjs` writes a starter `.releasetools.yaml` and prints the commands that declare the agent plugins the
release workflow expects, which is what [`declared-plugins`](conventions/declared-plugins.md) asks for. Pass
`--plugin <name>@<marketplace>` for anything beyond the release-notes plugin.

## What is here

- [CONVENTIONS.md](CONVENTIONS.md) — the index, one line per convention
- [conventions/](conventions/) — one file per convention, each at a stable URL, with what goes wrong without it
- [FORMAT.md](FORMAT.md) — what releasetools tools have to agree on exactly, the one file in normative language
- [guides/](guides/) — prose nothing checks: [writing a release note](guides/release-notes.md), running a repository
- [AGENTS.md](AGENTS.md) — how to add a convention
- [CHANGELOG.md](CHANGELOG.md) — dated changes to this repository
