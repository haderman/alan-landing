import type { APIRoute } from 'astro';

const DATASET_NAME = 'websites';
const ENDPOINT = `https://api.axiom.co/v1/datasets/${DATASET_NAME}/ingest`;
const TOKEN = 'xaat-ec1bff92-3e26-4fec-87c6-79971f56a8e2';

export const POST: APIRoute = async ({ request }) => {
  const ip = request.headers.get('x-real-ip');
  const { body } = await request.json();
  const bodyWithIp = {
    ...body,
    attributes: {
      ...body.attributes,
      ip,
    },
  };

  try {
    await logToAxiom(bodyWithIp, ip);
  } catch (error) {
    console.error('Error logging to Axiom:', error);
  }

  return new Response('Logger received', {
    status: 200,
  });
}

function logToAxiom(body: any, ip: string) {
  return fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify(body),
  });
}
