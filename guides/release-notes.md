# Release notes

The conventions say what a tool checks. This says what a good release note reads like, which no tool can check.

Write it in the change that makes it, while you still know why. A week later it is a diff, and a diff cannot say which
alternative was weighed and dropped.

## Write for somebody deciding whether to upgrade

They are on the previous version, something broke or they want the new thing, and they are scanning. They do not know
your internal names, they were not in the discussion, and they will read one line before deciding whether to read the
rest.

So a note says what a person running the software sees differently, and what they do about it.

> **Bad** Added flag for batch mode
>
> **Good** Batch mode processes up to 10,000 records per request. Enable it with the `batch=true` query parameter.

The bad one names a flag without saying what it does, which moves the reader's problem rather than solving it.

## Name the symptom, not the cause

A fix is read by somebody wondering whether it was their bug.

> **Bad** Fixed ignored file handling
>
> **Good** Removing a worktree deleted ignored files, at exit 0 and without a word

The second tells them whether it happened to them. The first tells them nothing they can match against a memory.

## One test decides whether there is a note at all

Can a person running this software observe it? A different result, a different line of output, a different exit code, a
new flag, a changed message. If none of those moved, it is `NONE`, whatever the change cost to build.

A command gaining an internal wrapper is not news. The same command refusing where it used to delete is.

## A breaking change owes more

The version says something broke. It does not say what to type instead, and the person reading it is mid-upgrade with a
failing build. Say what moved and what replaces it, in the footer
[`breaking-says-how`](../conventions/breaking-says-how.md) requires.

## What never goes in a note

Pull request numbers, issue numbers, branch names, commit hashes, author handles, and internal names for things. The
reader is deciding whether to upgrade, not auditing the work, and a release page carries all of that underneath,
generated, without anybody maintaining it.
