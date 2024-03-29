import type { APIRoute } from 'astro';
import { geolocation, ipAddress } from '@vercel/edge';

const DATASET_NAME = 'websites';
const ENDPOINT = `https://api.axiom.co/v1/datasets/${DATASET_NAME}/ingest`;
const TOKEN = import.meta.env.AXIOM_TOKEN;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { country, city } = geolocation(request);
    const ip = ipAddress(request);

    const bodyRaw = await extractBody(request)
    const body = JSON.parse(bodyRaw);
    const item = body[0];

    const bodyWithGeolocation = [{
      ...item,
      geo: {
        city,
        country,
        ip,
      },
    }];
    await logToAxiom(bodyWithGeolocation);
    return new Response('Logger received', { status: 200 });
  } catch (error) {
    console.error('Error logging to Axiom:', error);
    return new Response('Error logging to Axiom', { status: 500 });
  }
}

function logToAxiom(body: any) {
  return fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify(body),
  });
}

async function extractBody(request) {
  const dec = new TextDecoder();
  const reader = request.body.getReader();
  let body = ""

  while (true) {
    const { done, value } = await reader.read();
    if (done) return body;

    body = body + dec.decode(value)
  }
}
