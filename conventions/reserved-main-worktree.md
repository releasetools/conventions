---
name: reserved-main-worktree
status: draft
checked_by: []
superseded_by: null
---

# reserved-main-worktree

Each concurrent writer uses a separate linked worktree and branch, while the main worktree stays clean on the current
default branch for synchronization and release publication.

## Why

Agents editing the same checkout share its files and index. A branch switch changes the files beneath every process
using that directory, and staging can collect another agent's unfinished edits. Separate linked worktrees give each
writer its own files and index.

A release command run among unfinished changes can build or tag the wrong state. A clean main worktree gives the release
operator a checkout of merged work whose exact commit can be verified before publication.

## Examples

Good, two agents start separate task branches from the freshly fetched remote default branch. Each edits and runs its
checks in its own linked worktree. Neither switches branches or stages files in the main checkout.

Good, release preparation writes the version and changelog in a linked worktree and submits a pull request. After it
merges, one release operator fast-forwards the clean main checkout, verifies the intended release commit and publishes
that exact commit. A fix uses another linked worktree and pull request.

Bad, an agent edits the main checkout and creates a branch only when it is ready to commit.

Bad, two agents share a linked worktree because they expect to edit different files.

## Notes

The main worktree is the primary checkout reported by `git worktree list`, regardless of its directory name. The remote
declares the default branch; its name is not assumed to be `main`. A task already in its own linked worktree continues
there. A new development task gets a separate branch from the fetched default tip. Release preparation branches from the
fetched tip of the configured release branch, which defaults to the repository's default branch.

Development commands, including dependency installation and tests, run in the task's linked worktree. Release
preparation follows the same rule. The main checkout is reserved for synchronization and commands that verify or publish
the merged release. Release artifacts are built from the verified release commit, with output outside the main worktree.

At task start and after merges, a fetch and fast-forward bring the clean main checkout to the remote default tip.
Uncommitted files or local commits that prevent equality with that tip stop synchronization and are reported. A failed
fetch is reported too; cached refs do not establish that the checkout is current. Synchronization does not stash work,
reset branches or discard files to proceed. A task unable to create its linked worktree reports the failure and stops
before editing.

Main-worktree updates and release publication have one owner at a time, coordinated across agents. A release holds that
ownership from synchronization through publication, so another task cannot move its checkout during validation. The tag
names the exact merged commit whose version and required checks were verified. If the default branch advances, the
operator verifies the new tip before using it or releases the earlier verified commit explicitly.

Linked worktrees share repository refs. Each writer owns its task branch and leaves other agents' branches and worktrees
alone. A release from a configured branch other than the default uses its own linked worktree; the main checkout remains
on the default branch. CI can use an isolated checkout of the exact release commit.

[`signed-git`](signed-git.md) covers worktree tooling and signatures. [`delete-on-merge`](delete-on-merge.md) covers
branch cleanup. The release branch setting is described in [the configuration format](../FORMAT.md#configuration).

`checked_by` is empty: no tool currently checks worktree ownership or reserves the main checkout for publication.
