# Format

This is the machine-readable part of the conventions: what tools in releasetools have to agree on exactly. It is the only file in this repo written in normative language. The key words MUST, MUST NOT, SHOULD, SHOULD NOT and MAY are to be interpreted as described in RFC 2119.

**Status: proposal.** Nothing here is settled until a tool implements it.

## Terms

- **change** — the unit that carries a release note: a pull request or merge request, or a commit where those do not exist.
- **release note** — a short statement, written for the software's users, of one thing the change did.
- **declaration** — the block in a change's description that carries its release notes, or the word `NONE`.

## The block

A release note is declared in a fenced code block tagged `release-note` in the change's description:

```release-note
Fixed a crash when the config file is empty.
```

1. A change MUST contain at most one `release-note` block.
2. The block MUST contain either one or more release notes, one per line, or the single word `NONE`.
3. Text outside the block MUST NOT be treated as a release note.
4. Leading and trailing whitespace on each line, and empty lines, SHOULD be ignored.

## Notes

To be defined: whether a note carries structured fields, how notes are ordered when collected, and how special characters are escaped. See open questions.

## Configuration

Adopters declare exceptions in `.releasetools.yml` at the repo root:

```yaml
conventions:
  except:
    - <name>
```

1. `conventions.except` is a list of convention names. Each MUST match the `name` of a file in `conventions/`.
2. A tool MUST NOT check a convention listed in `except`.
3. A missing file is equivalent to an empty `except` list.
4. Tools MAY ignore keys they do not recognise.

## Open questions

- Block tag: `release-note` (Kubernetes-compatible, already a habit for many contributors) or `releasetools` (identifies the brand, and avoids being read by existing Kubernetes tooling that looks for `release-note`).
- Whether a note carries structured fields (kind, area, breaking-change marker) or is prose only.
- Whether a note may span multiple lines, and if so how notes are delimited.
