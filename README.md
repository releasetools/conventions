# releasetools conventions

Named, individually adoptable practices for writing release notes. Part of
[releasetools](https://github.com/releasetools).

Each convention is one sentence you can follow on its own, with a stable name you can link to. Tools in releasetools
enforce the conventions they know about.

## Adopting

A repository adopts the conventions by declaring `.releasetools.yaml` at its root and running the
[releasetools actions](https://github.com/releasetools/actions) that read it. That file is what a tool obeys: a name
under `conventions.except` turns off that convention's checks, and [FORMAT.md](FORMAT.md#configuration) gives the file
its shape.

`node bin/adopt.mjs` writes a starter `.releasetools.yaml` and prints the commands that declare the agent plugins the
release workflow expects, which is what [`declared-plugins`](conventions/declared-plugins.md) asks for. Pass
`--plugin <name>@<marketplace>` for anything beyond the release-notes plugin.

A line in a README or CONTRIBUTING is advisory. It tells a reader what to expect and changes nothing a tool does:

> This repo follows the [releasetools conventions](https://github.com/releasetools/conventions).

To say which ones you skip, name them there too, and in `conventions.except` where a tool will see it:

> This repo follows the [releasetools conventions](https://github.com/releasetools/conventions), except `note-or-none`.

## What is here

- [CONVENTIONS.md](CONVENTIONS.md) — the index, one line per convention
- [conventions/](conventions/) — one file per convention, each at a stable URL, with what goes wrong without it
- [FORMAT.md](FORMAT.md) — what releasetools tools have to agree on exactly, the one file in normative language
- [guides/](guides/) — prose nothing checks: [writing a release note](guides/release-notes.md), running a repository
- [AGENTS.md](AGENTS.md) — how to add a convention
- [templates/](templates/) — the file a new convention starts from
- [bin/](bin/) — `adopt.mjs`, which writes a starter `.releasetools.yaml`
- [scripts/](scripts/) — this repository's own checks, which `npm run lint` runs
- [CHANGELOG.md](CHANGELOG.md) — dated changes to this repository
