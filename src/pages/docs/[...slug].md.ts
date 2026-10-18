import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const prerender = true;

export async function getStaticPaths() {
  const docs = await getCollection("docs", ({ data }) => !data.draft);

  return docs.map((doc) => ({
    params: { slug: doc.id },
    props: { doc },
  }));
}

export const GET: APIRoute = ({ props }) => {
  const doc = props.doc;
  const description = doc.data.description.replace(/\r?\n/g, " ");
  const markdown = [
    `# ${doc.data.title}`,
    "",
    `> ${description}`,
    "",
    doc.body.trim(),
    "",
  ].join("\n");

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Link: `</docs/llms.txt>; rel="describedby"`,
    },
  });
};