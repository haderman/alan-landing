---
title: Connect your OpenAI API key
description: Add the OpenAI API key Alan AI uses to send requests from Visual Studio Code.
order: 2
group: Set up
---

Alan AI uses your own OpenAI API key. You can create or manage keys from the [OpenAI API keys page](https://platform.openai.com/api-keys).

## Create or locate a key

Sign in to your OpenAI account and create a key if you do not already have one. Copy it when it is shown and treat it like a password.

Before using the key with Alan, confirm that:

- Your OpenAI account can make API requests.
- Billing, usage limits, and organization settings are configured as needed.
- You are using the intended OpenAI account or organization.

## Add the key to Alan AI

1. Open Alan AI in Visual Studio Code.
2. Follow the first-run prompt to add an OpenAI API key.
3. Paste the key into the provided field and confirm.
4. Start a small test conversation.

The exact onboarding wording may change between extension versions. If you have already dismissed onboarding, open Alan AI again and look for its key or connection settings.

## Keep the key safe

Never commit an API key to a repository or paste it into a chat. Do not include it in bug reports, screenshots, terminal output, or shared settings files.

If you think the key was exposed, revoke it from OpenAI and create a replacement. Then reconnect Alan with the new key.

## If a request fails

Check the key before changing your prompt:

1. Confirm that it was copied without extra spaces.
2. Check that the key is still active in OpenAI.
3. Confirm that your account has available usage.
4. Try a short request with minimal context.
5. If the request still fails, follow the [troubleshooting guide](/docs/troubleshooting/).