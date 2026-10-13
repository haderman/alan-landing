---
title: Review code with Alan AI
description: Use Alan AI to inspect a change, find risks, and validate that the implementation matches its intended behavior.
order: 4
group: Workflows
---

Alan AI can help review a change before you commit or open a pull request. Treat its response as a second set of eyes, not as a replacement for tests or human review.

## Prepare the review

Give Alan a focused diff and enough surrounding context to understand it. Include:

- The goal of the change.
- The files or commit being reviewed.
- Related tests and expected behavior.
- Compatibility or performance constraints.
- Any areas you are especially concerned about.

Ask for findings before asking for edits. This makes it easier to distinguish an existing issue from a change introduced by the diff.

## Ask for concrete findings

A useful review prompt might look like this:

```text
Review the current change in src/api/session.ts and its tests.

Look for correctness issues, missing error handling, security risks, and race
conditions. Prioritize findings by severity, include file and line references,
and report findings before suggesting code changes.
```

Ask Alan to explain the impact of each finding and identify the conditions required to reproduce it. A specific finding is easier to verify than a general statement that code “could be improved.”

## Verify the response

Check each finding against the implementation and the tests:

1. Confirm that the referenced code exists.
2. Reproduce the behavior when practical.
3. Check whether an existing invariant or feature flag changes the conclusion.
4. Add or update a regression test for confirmed issues.
5. Run the smallest relevant test suite and inspect the final diff.

Alan may miss behavior that depends on environment variables, deployment configuration, generated files, or code outside the supplied context. Mention those dependencies explicitly when they matter.

## Review the final change

After addressing findings, ask for a second pass against the updated diff. Keep the final review focused on unresolved risks, test coverage, and whether the change still meets its original goal.

Do not share secrets, customer data, private credentials, or unnecessary proprietary source code in a prompt.