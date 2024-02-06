const URL = 'https://api.brevo.com/v3/smtp/email';
const API_KEY = import.meta.env.BREVO_API_KEY;

export function sendWelcomeMessage(email) {
  console.log('email: ', API_KEY);
  const data = {
    to: [{ email }],
    templateId: 3,
  };
  return fetch(URL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'accept': 'application/json',
      'api-key': API_KEY
    },
    body: JSON.stringify(data),
  })
}
