import type { APIRoute } from "astro";

export const prerender = true;

export const GET: APIRoute = function () {
  const markdown = [
    "# Alan AI",
    "",
    `${String.fromCharCode(62)} Alan AI is a free Visual Studio Code extension that brings multiple AI chat agents directly into your IDE.`,
    "",
    "Optimize your programming workflow without leaving Visual Studio Code.",
    "",
    "## Features",
    "",
    "- Customize each agent with instructions and temperature.",
    "- Edit or retry messages to save time and avoid rework.",
    "- Reference any file in the conversation or in agent instructions.",
    "- Upload multiple images at once to ask questions.",
    "- Ask questions, run commands, and get answers in the same chat.",
    "- Create multiple AI chat agents, each with its own system prompt.",
    "",
    "## Integrations and privacy",
    "",
    "- Connect to ChatGPT using your own OpenAI API key.",
    "- Your API key is securely stored in your system keychain.",
    "- Application data is stored locally on your computer.",
    "- Prompts and content are sent directly to OpenAI when you use the service.",
    "",
    "## Pricing",
    "",
    "Alan AI is free to use at $0 per month.",
    "",
    "The free plan includes:",
    "",
    "- Unlimited AI chat agents.",
    "- Unlimited message editing.",
    "- Access to future updates.",
    "",
    "## Frequently asked questions",
    "",
    "### Which AI models can I use?",
    "",
    "Alan uses the models available to your OpenAI API key. See [OpenAI's GPT-4 access guidance](https://help.openai.com/en/articles/7102672-how-can-i-access-gpt-4) for information about model access.",
    "",
    "### Where can I get an OpenAI API key?",
    "",
    "Create an OpenAI account, then get your key from the [OpenAI API Keys page](https://platform.openai.com/account/api-keys).",
    "",
    "### Which IDEs are supported?",
    "",
    "Alan AI is currently available for Visual Studio Code.",
    "",
    "## Get started",
    "",
    "Install [Alan AI from the Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=haderman.alanai).",
    "",
  ].join("\n");

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Link:
        String.fromCharCode(60) +
        "/llms.txt" +
        String.fromCharCode(62) +
        '; rel="describedby"',
    },
  });
};