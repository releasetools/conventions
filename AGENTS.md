# Agents

[README.md](README.md) says what this repository is. This says how to change it.

## Adding a convention

Copy [templates/convention.md](templates/convention.md) to `conventions/<name>.md`, fill in the front matter and every
section, and add a row to [CONVENTIONS.md](CONVENTIONS.md) in the same change.

Names are permanent, lowercase and hyphenated, and describe the practice rather than its rationale: `note-or-none`, not
`because-users-read-them`. A convention whose meaning changes gets a new name. The old file stays, its `status` becomes
`deprecated` and its `superseded_by` names the successor, which is what lets an adopter's `except` list keep meaning
what it meant when they wrote it.

Every file in `conventions/` is a convention, because an adopter's `except` name has to
[match one](FORMAT.md#configuration). Anything else lives elsewhere, which is why the template does.

## Writing here

Normative language belongs in [FORMAT.md](FORMAT.md) and nowhere else. A convention is descriptive: "a release note
names the user-facing change", not "a release note MUST name the user-facing change".

The markdown mechanics, down to the rule against repeating what another file says, are in
[guides/docs-style.md](guides/docs-style.md).

Every change adds its own entry to [CHANGELOG.md](CHANGELOG.md), under today's date, which is what
[`changelog-per-change`](conventions/changelog-per-change.md) asks of a repository that adopts it.
