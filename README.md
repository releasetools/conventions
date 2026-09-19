# releasetools conventions

Named, individually adoptable practices for writing release notes. Part of [releasetools](https://github.com/releasetools).

Each convention is one sentence you can follow on its own, with a stable name you can link to. Tools in releasetools enforce the conventions they know about. The parts those tools have to agree on exactly live in [FORMAT.md](FORMAT.md); everything else is written to be read by people.

## Adopting

Add one line to your README or CONTRIBUTING:

> This repo follows the [releasetools conventions](https://github.com/releasetools/conventions).

Adoption is opt-out: that line means all of them. To skip some, name them:

> This repo follows the [releasetools conventions](https://github.com/releasetools/conventions), except `note-or-none`.

Declare the same thing for tools in `.releasetools.yml` at the repo root:

```yaml
conventions:
  except: []
```

A name listed under `except` turns off that convention's checks in every releasetools tool that reads the file.

## Reading

- [CONVENTIONS.md](CONVENTIONS.md) — the index, one line per convention
- [conventions/](conventions/) — one file per convention; each file's URL is stable
- [FORMAT.md](FORMAT.md) — the machine-readable part, in normative language
- [CHANGELOG.md](CHANGELOG.md) — dated changes to this repo

## Contributing a convention

Copy [conventions/_template.md](conventions/_template.md) to `conventions/<name>.md` and add a row to [CONVENTIONS.md](CONVENTIONS.md).

Names are permanent. A convention whose meaning changes gets a new name; the old file stays, marked deprecated, and points to its successor. That is what lets an adopter's `except` list keep meaning what it meant when they wrote it.

Names are lowercase and hyphenated, and describe the practice rather than its rationale: `note-or-none`, not `because-users-read-them`.
