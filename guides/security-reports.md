# Security reports

Report a vulnerability through the repository's private reporting form, on the Advisories tab. Do not open a public
issue.

A report needs a reproduction, or a trace from an attacker-reachable entry point to the flaw. Scanner output that
matches a version string is not a trace.

## Not vulnerabilities

- A transitive dependency CVE whose vulnerable symbol nothing calls. Show the call path.
- An action available to someone who already holds the equivalent permission.
- Behaviour a configuration opted into, against the documented defaults.
- A crash where restart is the documented operating model.
- An unverified AI report. Reproduce it yourself first. You are the author of what you send.
- A compliance finding that describes no concrete flaw. That conversation belongs between you and your auditor.
- Anything in a release that is no longer supported.

These may still be real bugs. File them as issues.

## What to expect

One maintainer, no SLA. A fix ships in the next release unless the flaw is exploitable against a supported version in a
documented configuration, which earns a release of its own. A deadline from your compliance programme is not an input to
that decision.

A dependency bump that only quiets a scanner is an ordinary pull request, not a security fix, and is not backported.

## Enabling it

Private reporting is off by default, and it is a public-repository feature. The API answers 404 for a private one.

Turn it on under Settings, in Advanced Security, next to "Private vulnerability reporting". Or:

```bash
gh api -X PUT repos/OWNER/REPO/private-vulnerability-reporting
```

`GET` reports the current state and `DELETE` turns it off. An organisation can set it for every repository at once
through a custom security configuration. The Terraform GitHub provider cannot do any of this: it manages Dependabot
alerts and secret scanning, and has no attribute for private reporting.

A `SECURITY.md` in the repository overrides the one served from `.github`. Delete the local file rather than leaving a
stale copy to win.
