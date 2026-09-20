# releasetools conventions

Named, individually adoptable practices for writing release notes. Part of [releasetools](https://github.com/releasetools).

Each convention is one sentence you can follow on its own, with a stable name you can link to. Tools in releasetools enforce the conventions they know about. The parts those tools have to agree on exactly live in [FORMAT.md](FORMAT.md); everything else is written to be read by people.

## Adopting

Add one line to your README or CONTRIBUTING:

> This repo follows the [releasetools conventions](https://github.com/releasetools/conventions).

Adoption is opt-out: that line means all of them. To skip some, name them:

> This repo follows the [releasetools conventions](https://github.com/releasetools/conventions), except `note-or-none`.

Declare the same thing for tools in `.releasetools.yaml` at the repo root:

```yaml
# How this repository releases, read by every releasetools tool.
#
# Conventions: https://github.com/releasetools/conventions
# Tools:       https://github.com/releasetools
conventions:
  except: []
```

A name listed under `except` turns off that convention's checks in every releasetools tool that reads the file.

Name the agent plugins the workflow expects where the agent already looks, which is what [`declared-plugins`](conventions/declared-plugins.md) asks for. One command writes both declarations, merging into what is already there:

```shell
node bin/adopt.mjs
```

It creates `.releasetools.yaml` if the repository has none, naming the repository itself as the one project and the manifest that carries its version, then prints the commands that declare the plugins: `claude plugin marketplace add <repo> --scope project` and `claude plugin install <name>@<marketplace> --scope project`, which write the repository's own `.claude/settings.json`, and the `codex plugin add` line for each, since Codex keeps its plugins in its own configuration. Pass `--plugin <name>@<marketplace>` for anything beyond the release-notes plugin.

## Guide

The conventions say what a tool checks. This says what a good release note reads like, which no tool can check.

### Write for somebody deciding whether to upgrade

They are on the previous version, something broke or they want the new thing, and they are scanning. They do not know your internal names, they were not in the discussion, and they will read one line before deciding whether to read the rest.

So a note says what a person running the software sees differently, and what they do about it.

> **Bad** Added flag for batch mode
>
> **Good** Batch mode processes up to 10,000 records per request. Enable it with the `batch=true` query parameter.

The bad one names a flag without saying what it does, which moves the reader's problem rather than solving it.

### Name the symptom, not the cause

A fix is read by somebody wondering whether it was their bug.

> **Bad** Fixed ignored file handling
>
> **Good** Removing a worktree deleted ignored files, at exit 0 and without a word

The second tells them whether it happened to them. The first tells them nothing they can match against a memory.

### One test decides whether there is a note at all

**Can a person running this software observe it?** A different result, a different line of output, a different exit code, a new flag, a changed message. If none of those moved, it is `NONE`, whatever the change cost to build.

A command gaining an internal wrapper is not news. The same command refusing where it used to delete is.

### A breaking change owes more

The version says something broke. It does not say what to type instead, and the person reading it is mid-upgrade with a failing build. Say what moved, and what replaces it. Where the answer needs a table, put the table in the note and keep the footer to the sentence somebody reads in a terminal.

### What never goes in a note

Pull request numbers, issue numbers, branch names, commit hashes, author handles, and internal names for things. The reader is deciding whether to upgrade, not auditing the work, and a release page carries all of that underneath, generated, without anybody maintaining it.

### Write it when you know it

The reason a note is declared on the change rather than assembled at release is that the person who made the change is the only one who knows why, and they know it now. A week later it is a diff, and a diff cannot say which alternative was weighed and dropped.

## Repository guides

Short guides for running a repository, written to be linked from any organisation's `CONTRIBUTING.md` or `SECURITY.md` rather than copied into it. They are prose: nothing checks them, they carry no stable names to depend on, and they cannot appear in an `except` list.

- [pull-requests.md](guides/pull-requests.md) — shaping a change so it can be reviewed
- [reviewing.md](guides/reviewing.md) — giving and receiving review
- [issues.md](guides/issues.md) — filing, answering and closing
- [ai-contributions.md](guides/ai-contributions.md) — disclosure, and who is responsible
- [security-reports.md](guides/security-reports.md) — what counts as a vulnerability
- [docs-style.md](guides/docs-style.md) — markdown mechanics

They are cut down from the [Kubernetes contributor guide](https://github.com/kubernetes/community/tree/main/contributors/guide), which coordinates thousands of maintainers. None of that machinery is here: no OWNERS files, no SIGs, no CLA, no triage rotation, no timers that close an issue on their own.

### Reaching a repository

GitHub serves `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `SUPPORT.md`, and issue and pull request templates from a public repository named `.github`, to every repository of the same owner that has no file of its own. The owner can be an organisation or a personal account; the rule is the same for both. A file in the repository itself wins over the default.

The profile README is the part that does differ by account type. An organisation puts it in `.github` at `profile/README.md`. A personal account puts it in a repository named after the username, as `README.md` in its root.

## Reading

- [CONVENTIONS.md](CONVENTIONS.md) — the index, one line per convention
- [conventions/](conventions/) — one file per convention; each file's URL is stable
- [FORMAT.md](FORMAT.md) — the machine-readable part, in normative language
- [guides/](guides/) — prose guides for running a repository
- [CHANGELOG.md](CHANGELOG.md) — dated changes to this repo

## Contributing a convention

Copy [conventions/_template.md](conventions/_template.md) to `conventions/<name>.md` and add a row to [CONVENTIONS.md](CONVENTIONS.md).

Names are permanent. A convention whose meaning changes gets a new name; the old file stays, marked deprecated, and points to its successor. That is what lets an adopter's `except` list keep meaning what it meant when they wrote it.

Names are lowercase and hyphenated, and describe the practice rather than its rationale: `note-or-none`, not `because-users-read-them`.
