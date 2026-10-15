import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const prerender = true;

const docs = (await getCollection("docs"))
  .filter(({ data }) => !data.draft)
  .sort(
    (a, b) => a.data.order - b.data.order || a.id.localeCompare(b.id),
  );

export const GET: APIRoute = () => {
  const markdown = [
    "# Alan AI Documentation",
    "",
    "> Documentation for Alan AI, a Visual Studio Code extension with multiple AI chat agents.",
    "",
    "Alan AI uses your own OpenAI API key. Application data is stored locally, while prompts and content are sent to OpenAI.",
    "",
    "## Documentation",
    "",
    "- [Documentation index](https://www.alanai.app/docs/index.md): Overview of the available Alan AI guides.",
    ...docs.map(
      (doc) =>
        `- [${doc.data.title}](https://www.alanai.app/docs/${doc.id}.md): ${doc.data.description}`,
    ),
    "",
  ].join("\n");

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};