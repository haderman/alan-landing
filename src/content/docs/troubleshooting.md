---
title: Troubleshooting
description: Diagnose common Alan AI setup, connection, and response problems in Visual Studio Code.
order: 5
group: Troubleshooting
---

Most issues can be narrowed down by checking whether the problem is with the extension, the API connection, or the prompt context.

## Alan AI does not appear

If you cannot find the Alan AI panel:

1. Confirm that the extension is installed and enabled.
2. Reload the Visual Studio Code window.
3. Open the Command Palette and search for Alan AI commands.
4. Check the Extensions view for an extension error or update.
5. Restart Visual Studio Code and try opening the panel again.

If the panel is still unavailable, note your Visual Studio Code version, extension version, and operating system before reporting the issue.

## Requests fail immediately

An immediate failure often indicates a connection or account problem.

- Check that your [OpenAI API key](/docs/connect-openai/) is present and active.
- Confirm that the key was copied without extra spaces.
- Check your OpenAI account usage, billing, and limits.
- Try a short request without file attachments or a large code selection.
- Reconnect with a replacement key if the original key may have been exposed.

Avoid repeatedly retrying a request while investigating. Multiple retries can make usage and rate-limit problems harder to diagnose.

## Responses are incomplete or not useful

Start with a smaller request and add context gradually:

1. State the expected outcome.
2. Name the relevant file or symbol.
3. Include the exact error or unexpected behavior.
4. Specify constraints such as supported runtimes or files that must not change.
5. Ask for a plan before requesting a multi-file implementation.

The [prompting guide](/docs/prompting/) includes examples of prompts that make assumptions easier to spot.

## Alan made an incorrect change

Do not apply a suggested change blindly. Ask Alan to explain the relevant code path, compare the proposal with an existing pattern, and identify tests that should cover the behavior.

Review the diff yourself, run the relevant checks, and undo the change if it does not match your goal. For a structured second opinion, follow the [code review guide](/docs/code-review/).

## Report a reproducible problem

Before asking for help, collect:

- The steps that reproduce the problem.
- The expected and observed behavior.
- The full error message, with secrets removed.
- Visual Studio Code and Alan AI versions.
- The operating system and relevant project details.
- Whether the problem happens in a new workspace.

Never include your API key, private source code, customer data, or other credentials in a report. If a key may have been exposed, revoke it and create a replacement first.