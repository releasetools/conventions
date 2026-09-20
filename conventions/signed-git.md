---
name: signed-git
status: draft
checked_by: []
superseded_by: null
---

# signed-git

Changes use branches and worktrees managed with [git-worktrees], reach the default branch through pull requests,
normally by squash merge with signed rebase merges also allowed, and every commit and tag is signed.

## Why

A pull request records the change being reviewed. A separate worktree gives each branch its own checkout, so work on
another change does not disturb the files under review. Squashing makes the accepted change one commit in the default
branch's history; rebasing keeps individual commits when they are useful to read separately.

A commit's author field alone proves nothing about who created it. A signature binds the commit to a signing key. A tag
is a separate object with its own signature: signing the commit it points to does not authenticate the tag's name or
message.

## Examples

Good, a change developed on a branch from the freshly fetched remote default branch, in a worktree created with `gwa`,
with every commit signed, then submitted as a pull request and squash-merged on GitHub. The resulting commit carries
GitHub's web-flow signature.

Good, a pull request whose individual commits are retained by rebasing locally with signing enabled, then
fast-forwarding those signed commits into its base branch through the repository's permitted merge procedure.

Good, local commits and tags use the signing key selected by Git configuration. With that key already configured, these
settings enable signing:

```sh
git config commit.gpgSign true
git config tag.gpgSign true
```

Good, a release tag is signed and both signatures are checked:

```sh
git tag -s v1.2.3 -m "Release 1.2.3"
git verify-commit v1.2.3^{commit}
git verify-tag v1.2.3
```

Good, a merge commit body that describes the behaviour in plain language:

```text
Downloads retry when the server closes the connection. Retries stop after five attempts.
```

Bad:

- A change committed directly to the default branch without a pull request.
- Unsigned branch commits, even if the eventual squash commit is signed.
- An unsigned tag pointing at a signed commit.
- Signing disabled to get an amend or rebase past a signing failure.

## Notes

Every new branch starts with an attempt to fetch the remote default branch and uses its latest fetched tip as the base.
This applies to work started after a merged pull request too. A failed fetch is reported, so a cached base is never
presented as current.

After a rebase, an existing remote branch is updated with `git push --force-with-lease`. First pushes use ordinary
`git push`.

Pull request descriptions and merge commit bodies are short, concrete accounts of the final change in natural language.
Generated drafts are edited to remove stock AI phrasing and unsupported claims.

Signing covers local and automated commits, including the new commits an amend or rebase creates. Local signing uses the
key Git configuration selects; no workflow hardcodes a personal key. `Signed-off-by` is a trailer, not a cryptographic
signature.

[GitHub signs squash merges with its web-flow key][github-signing]. That signature satisfies this convention; the author
remains the contributor and the committer is GitHub. GitHub's **Rebase and merge** creates unsigned commits, so that
button does not satisfy the convention. A local [`git rebase --gpg-sign`][git-rebase] signs the rewritten commits; the
merge procedure retains those objects and respects the repository's branch protections.

All tags are signed annotated tags, including floating tags. Tag names and which tags can move are described in
[FORMAT.md](../FORMAT.md#versions-and-tags).

[git-worktrees] provides `gwa` to create a worktree and `gwl` to switch between worktrees. Its status and removal
commands handle cleanup. The project's documentation describes the commands and their safeguards.

`checked_by` is empty because no tool checks this convention as a whole. Commit and tag signatures can be checked with
`git verify-commit` and `git verify-tag`; those checks do not establish whether a change used a pull request or a
worktree.

[git-worktrees]: https://github.com/MihaiBojin/worktrees
[github-signing]:
  https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification
[git-rebase]: https://git-scm.com/docs/git-rebase
