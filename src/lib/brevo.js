const URL = 'https://api.brevo.com/v3/smtp/email';
const API_KEY = import.meta.env.SUPABASE_URL;

export function sendWelcomeMessage(email) {
  const data = {
    to: [{ email }],
    templateId: 3,
  };
  return fetch(URL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'api-key': API_KEY
    },
    body: JSON.stringify(data),
  })
}
