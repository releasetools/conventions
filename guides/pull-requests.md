# Pull requests

One idea per pull request. If the description needs "and", it is two.

Prefactoring gets its own commit, or its own pull request. Unrelated fixes you noticed on the way go somewhere else.

Commits mark logical steps, not the order you happened to work in. Squash the fixups and keep the steps. A commit
message says what changed and why, because it is the record that outlives the pull request.

The subject carries a Conventional Commits type, which is what decides the version bump and the changelog section. See
[`typed-change`](../conventions/typed-change.md).

The description says what changed and who it affects. It carries the `release-note` block; see
[FORMAT.md](../FORMAT.md).

Tests come with the change. A pull request that alters behaviour and touches no test is unfinished.

Nothing spans the whole repository. A sweeping change is many small ones, and each one can be judged.
