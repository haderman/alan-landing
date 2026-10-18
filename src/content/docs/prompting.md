---
title: Write effective prompts
description: Give Alan AI the context, constraints, and expected outcome it needs for useful answers.
order: 3
group: Workflows
---

A good prompt gives Alan AI enough information to make a useful first attempt without guessing what success looks like.

## Use a simple structure

Describe four things:

1. **Goal:** What are you trying to accomplish?
2. **Context:** Which files, errors, or decisions matter?
3. **Constraints:** What must stay unchanged?
4. **Output:** What should Alan return or change?

For example:

```text
Add validation for the signup form in src/components/SignupForm.tsx.

Use the existing error-message styles and do not change the API response shape.
First explain the validation rules you found, then suggest the smallest implementation.
```

## Include the right context

Share the smallest useful set of files or symbols rather than the entire repository. Mention related types, tests, configuration, and recent changes when they affect the answer.

If the request depends on runtime behavior, include:

- The command or action that reproduces the problem.
- The expected and observed results.
- Relevant error output.
- The runtime, framework, or package version.
- Whether the issue happens every time or only in certain cases.

## Ask for a plan before a large change

For work that crosses several files, ask Alan to inspect the relevant code and propose a plan before making edits.

A useful follow-up sequence is:

1. Ask for an inventory of the affected files.
2. Ask what assumptions or risks the plan has.
3. Confirm the plan and constraints.
4. Ask for the implementation.
5. Ask for a review of the resulting diff.

This keeps the reasoning and the final change easier to inspect.

## Improve an answer with follow-ups

If the first answer is too broad, narrow it with a specific follow-up:

- “Show only the files that need to change.”
- “Keep the current public API.”
- “Explain why this fixes the race condition.”
- “Add a test for the failure case.”
- “What assumption are you making about this response?”
- “Compare this with the existing pattern in `src/lib/`.”

Treat the conversation as an iterative review rather than accepting the first suggestion without checking it.