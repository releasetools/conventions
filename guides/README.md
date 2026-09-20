# Guides

Prose, written to be linked from a repository's `CONTRIBUTING.md` or `SECURITY.md` rather than copied into it. Nothing
checks these, they carry no stable names to depend on, and they cannot appear in an `except` list.

- [release-notes.md](release-notes.md) — what a good note reads like
- [pull-requests.md](pull-requests.md) — shaping a change so it can be reviewed
- [reviewing.md](reviewing.md) — giving and receiving review
- [issues.md](issues.md) — filing, answering and closing
- [ai-contributions.md](ai-contributions.md) — disclosure, and who is responsible
- [security-reports.md](security-reports.md) — what counts as a vulnerability
- [docs-style.md](docs-style.md) — markdown mechanics

The ones on running a repository are cut down from the
[Kubernetes contributor guide](https://github.com/kubernetes/community/tree/main/contributors/guide), which coordinates
thousands of maintainers. None of that machinery is here: no OWNERS files, no SIGs, no CLA, no triage rotation, no
timers that close an issue on their own.

## Reaching a repository

GitHub serves `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `SUPPORT.md`, and issue and pull request templates
from a public repository named `.github`, to every repository of the same owner that has no file of its own. The owner
can be an organisation or a personal account; the rule is the same for both. A file in the repository itself wins over
the default.

The profile README is the part that does differ by account type. An organisation puts it in `.github` at
`profile/README.md`. A personal account puts it in a repository named after the username, as `README.md` in its root.
