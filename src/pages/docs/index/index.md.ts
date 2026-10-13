import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const prerender = true;

function isPublished(entry: { data: { draft?: boolean } }) {
  return !entry.data.draft;
}

const docs = (await getCollection("docs"))
  .filter(isPublished)
  .sort(function (a, b) {
    return a.data.order - b.data.order || a.id.localeCompare(b.id);
  });

export const GET: APIRoute = function () {
  const markdown = [
    "# Alan AI Documentation",
    "",
    `${String.fromCharCode(62)} Learn how to install Alan AI, connect your OpenAI API key, and create AI chat agents in Visual Studio Code.`,
    "",
    "Alan brings multiple AI chats directly into Visual Studio Code. Follow the guides to install the extension, connect your OpenAI API key, and build a workflow that fits your projects.",
    "",
    "## Guides",
    "",
    ...docs.map(function (doc) {
      return `- [${doc.data.title}](https://www.alanai.app/docs/${doc.id}.md): ${doc.data.description}`;
    }),
    "",
  ].join("\n");

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Link: '</docs/llms.txt>; rel="describedby"',
    },
  });
};