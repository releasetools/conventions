---
name: delete-on-merge
status: draft
checked_by: []
superseded_by: null
---

# delete-on-merge

A branch is deleted once the change it carried has merged, and whether it merged is decided by the content it holds
rather than by its commits.

## Why

A forge that squashes writes one new commit onto the default branch and leaves the branch's own commits reachable from
nothing else. The branch is still there afterwards, on the forge and in every clone that fetched it, and it is
indistinguishable at a glance from a branch whose work never landed. A repository that merges a few changes a week
accumulates a list where most rows are finished work, so nobody reads the list, and the one row that holds an unfinished
change is the one nobody notices.

The check people reach for makes it worse. `git branch --merged main` asks whether the branch tip is an ancestor of
`main`, which a squash merge guarantees it is not, so the command lists nothing and `git branch -d` refuses every branch
it is given. The safe answer and the true answer point in opposite directions: the tool says "this branch holds work you
have not merged" about work that shipped weeks ago, which teaches its reader to reach for `-D` and stop reading the
warning. The next branch deleted that way is the one that held something.

## Examples

Good, the forge deletes the head branch when the change merges:

```shell
gh repo edit --delete-branch-on-merge
```

Good, a clone drops what the forge already dropped. `--prune` deletes the remote-tracking refs, which marks their local
branches `gone`:

```shell
git fetch --prune
git branch -vv
```

```text
  install-at-v1  937b33e [origin/install-at-v1: gone] docs: install the CLI at @1 rather than @latest
* main           445f764 [origin/main] feat: read the declaration, and stop where there is none (#25)
```

Bad, ancestry as the test. In a repository that squashes, this lists nothing, whatever has merged:

```shell
git branch --merged main
```

## Notes

Three questions settle whether the change landed, in the order that costs least:

1. What the forge says. `gh pr list --state all --head <branch>` answers with the change itself, and a merged pull
   request is the end of it.
2. Whether the commits are in the default branch, for a merge that kept them:
   `git merge-base --is-ancestor <branch> origin/main`. True means `git branch -d` will accept the branch.
3. Whether the content is in the default branch, for a merge that did not. Replay the branch's tree as one commit on the
   merge base, and ask whether that patch is upstream:

   ```shell
   base=$(git merge-base origin/main <branch>)
   synthetic=$(git commit-tree "$(git rev-parse '<branch>^{tree}')" -p "$base" -m _)
   git cherry origin/main "$synthetic"
   ```

   `-` means the squash merge already carried it, `+` means it did not. The comparison is by patch id rather than by
   text, so it survives a default branch that moved on afterwards. The synthetic commit is unreferenced and the next
   `git gc` collects it.

A fourth question asks whether the branch holds anything besides that change. A merged pull request speaks for the
commits that were pushed and for nothing else, so a commit that never left the clone leaves the branch unfinished
whatever the forge says: `git rev-list --count @{upstream}..<branch>` counts them, or
`git rev-list --count <branch> --not --remotes` where the branch has no upstream.

A branch that none of this explains holds work that never merged, and that is the list worth reading.

Deleting the branch does not delete the change. A merged pull request keeps its commits and its diff, and a forge that
offers to restore the branch restores it from there.

A branch that is not a change is outside this: a release line that outlives its tag, `gh-pages`, the default branch
itself.
