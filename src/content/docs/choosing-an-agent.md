---
title: Choosing an agent
description: Pick the right Alan AI chat for planning, implementation, debugging, and review work.
order: 2
group: Start here
---

Alan AI includes multiple chat agents so you can choose a workflow instead of repeating the same instructions in every conversation.

## Match the agent to the task

Start with the kind of help you need:

| Task | A good starting point |
| --- | --- |
| Understand an unfamiliar file or feature | Ask for an explanation |
| Plan a change across several files | Ask for an implementation plan |
| Write or update code | Ask for an implementation |
| Investigate an error | Share the error and ask for debugging help |
| Check a change before committing | Ask for a code review |

The available agents and labels may change as Alan AI evolves. Read the agent description in the extension before starting a conversation.

## Give the agent enough context

An agent can only make a useful recommendation from the context you provide. Include:

- The goal and who the change is for.
- The files or symbols involved.
- Constraints such as supported runtimes or API compatibility.
- What you already tried.
- The expected behavior and the behavior you observed.

For example, a useful request is:

```text
Review the authentication change in src/auth/session.ts.
Look for missing error handling and session expiry issues.
Keep the existing public API, and report findings before suggesting edits.
```

## Keep one goal per conversation

Use a separate conversation for unrelated work. A focused conversation is easier to review, and the agent is less likely to carry assumptions from an earlier task into a new one.

When a task grows, ask Alan to summarize the current decisions before moving to the next step. You can use that summary as the starting context for a new conversation.